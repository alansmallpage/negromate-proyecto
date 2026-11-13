/** -------------------------------------------------------------------
 * ============================================
 * Controlador de las ordenes
 * ============================================
 */

import Order from "../db/models/Order.model.js";
import Product from "../db/models/Product.model.js";

// Obtener todas las órdenes (Admin)
export const getAllOrders = async (req, res, next) => {
  const ResponseAPI = {
    msg: "Lista de órdenes obtenida",
    data: [],
    status: "ok",
  };

  try {
    // Buscar todas las órdenes, las más recientes primero
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "username email")
      .populate("items.product", "name imageUrl category");
    ResponseAPI.data = orders;
    res.status(200).json(ResponseAPI);
  } catch (error) {
    next(error);
  }
};

// Obtener las ordenes del usuario con login
export const getUserOrders = async (req, res, next) => {
  const ResponseAPI = {
    msg: "Órdenes del usuario obtenidas",
    data: [],
    status: "ok",
  };

  try {
    // Filtrar ordenes del usuario autenticado con su ID, las más recientes primero
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name imageUrl category");
    ResponseAPI.data = orders;
    res.status(200).json(ResponseAPI);
  } catch (error) {
    next(error);
  }
};

// Obtener una orden por su ID
export const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  const ResponseAPI = {
    msg: "Orden encontrada",
    data: null,
    status: "ok",
  };

  try {
    const order = await Order.findById(id)
      .populate("user", "username email")
      .populate("items.product", "name imageUrl category");

    if (!order) {
      ResponseAPI.msg = "Orden no encontrada";
      ResponseAPI.status = "error";
      return res.status(404).json(ResponseAPI);
    }
    // Cada usuario solo puede ver sus órdenes (el admin puede verlas todas)
    // Si el usuario se borró, order.user es null (por eso el ?.)
    if (
      req.user.role !== "admin" &&
      order.user?._id.toString() !== req.user._id.toString()
    ) {
      ResponseAPI.msg = "No tienes permiso para ver esta orden";
      ResponseAPI.status = "error";
      return res.status(403).json(ResponseAPI);
    }
    ResponseAPI.data = order;
    res.status(200).json(ResponseAPI);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva orden (Autenticado)
export const createOrder = async (req, res, next) => {
  const { orderItems } = req.body;
  const ResponseAPI = {
    msg: "Orden creada con éxito",
    data: null,
    status: "ok",
  };
  // Verificar que hay al menos un artículo
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    ResponseAPI.msg = "No hay artículos en la orden";
    ResponseAPI.status = "error";
    return res.status(400).json(ResponseAPI);
  }

  try {
    // Los precios se sacan de la base de datos, no de lo que envía el navegador
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((item) => item.product) },
    });
    const missing = orderItems.find(
      (item) => !itemsFromDB.some((p) => p._id.toString() === item.product)
    );
    if (missing) {
      ResponseAPI.msg = `Producto con id ${missing.product} no encontrado`;
      ResponseAPI.status = "error";
      return res.status(400).json(ResponseAPI);
    }

    let totalAmount = 0;
    const processedItems = orderItems.map((item) => {
      const dbProduct = itemsFromDB.find((p) => p._id.toString() === item.product);
      totalAmount += dbProduct.price * item.quantity;
      return {
        product: item.product,
        quantity: item.quantity,
        price: dbProduct.price,
      };
    });
    // Crear la orden con el usuario autenticado
    const order = new Order({
      user: req.user._id,
      items: processedItems,
      totalAmount: totalAmount,
    });
    const createdOrder = await order.save();
    ResponseAPI.data = createdOrder;
    res.status(201).json(ResponseAPI);
  } catch (error) {
    next(error);
  }
};

// Actualizar el estado de una orden (Admin)
export const updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const ResponseAPI = {
    msg: "Estado de la orden actualizado",
    data: null,
    status: "ok",
  };

  try {
    // Buscar la orden en la base de datos
    const order = await Order.findById(id);

    if (!order) {
      ResponseAPI.msg = "Orden no encontrada";
      ResponseAPI.status = "error";
      return res.status(404).json(ResponseAPI);
    }
    const validStatuses = ["pending", "completed", "cancelled"];
    if (status && !validStatuses.includes(status)) {
      ResponseAPI.msg = "Estado inválido. Debe ser: pending, completed o cancelled";
      ResponseAPI.status = "error";
      return res.status(400).json(ResponseAPI);
    }
    if (status !== undefined) order.status = status;
    const updatedOrder = await order.save();
    ResponseAPI.data = updatedOrder;
    res.status(200).json(ResponseAPI);
  } catch (error) {
    next(error);
  }
};

// Eliminar una orden (Admin)
export const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  const ResponseAPI = {
    msg: "Orden eliminada con éxito",
    data: null,
    status: "ok",
  };

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      ResponseAPI.msg = "Orden no encontrada";
      ResponseAPI.status = "error";
      return res.status(404).json(ResponseAPI);
    }
    ResponseAPI.data = { _id: id };
    res.status(200).json(ResponseAPI);
  } catch (error) {
    next(error);
  }
};
