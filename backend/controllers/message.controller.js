/** -------------------------------------------------------------------
 * ============================================
 * Controlador de Mensajes de Contacto
 * ============================================
 */

import Message from "../db/models/Message.model.js";

// Guardar un mensaje del formulario de contacto (público)
export const createMessage = async (req, res, next) => {
  const { name, email, phone, clientType, message } = req.body;
  const ResponseAPI = {
    msg: "Mensaje enviado con éxito",
    data: null,
    status: "ok",
  };

  try {
    if (!name || !email) {
      ResponseAPI.msg = "El nombre y el email son obligatorios";
      ResponseAPI.status = "error";
      return res.status(400).json(ResponseAPI);
    }
    // Guardar el mensaje en la base de datos
    const newMessage = await Message.create({
      name,
      email,
      phone,
      clientType,
      message,
    });
    ResponseAPI.data = { _id: newMessage._id };
    res.status(201).json(ResponseAPI);
  } catch (error) {
    // Si el email o el tipo de cliente no son válidos, el middleware de
    // errores responde con un 400
    next(error);
  }
};

// Obtener todos los mensajes, los más recientes primero (Admin)
export const getAllMessages = async (req, res, next) => {
  const ResponseAPI = {
    msg: "Lista de mensajes obtenida",
    data: [],
    status: "ok",
  };

  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    ResponseAPI.data = messages;
    res.status(200).json(ResponseAPI);
  } catch (error) {
    next(error);
  }
};

// Eliminar un mensaje por su ID (Admin)
export const deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  const ResponseAPI = {
    msg: "Mensaje eliminado con éxito",
    data: null,
    status: "ok",
  };

  try {
    // Eliminar y comprobar que existía
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      ResponseAPI.msg = "Mensaje no encontrado";
      ResponseAPI.status = "error";
      return res.status(404).json(ResponseAPI);
    }
    ResponseAPI.data = { _id: id };
    res.status(200).json(ResponseAPI);
  } catch (error) {
    next(error);
  }
};
