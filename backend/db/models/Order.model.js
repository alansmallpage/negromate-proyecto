/** -------------------------------------------------------------------
 * ============================================
 * Esquema del Item de la Orden
 * ============================================
 */

import mongoose from "mongoose";

const { Schema } = mongoose;
const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Falta el producto"],
  },
  quantity: {
    type: Number,
    required: [true, "La cantidad es obligatoria"],
    min: [1, "La cantidad mínima es 1"],
    validate: {
      validator: Number.isInteger,
      message: "La cantidad debe ser un número entero",
    },
  },
  price: {
    type: Number,
    required: true,
  },
});
/** -------------------------------------------------------------------
 * ============================================
 * Esquema del Orden
 * ============================================
 */
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    // pending: recibido · completed: terminado · cancelled: cancelado
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
