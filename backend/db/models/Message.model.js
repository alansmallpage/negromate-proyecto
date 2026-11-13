/** -------------------------------------------------------------------
 * ============================================
 * Esquema de Mensaje de Contacto
 * ============================================
 */

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    // Nombre de la persona o empresa
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede superar los 100 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Por favor, introduce un email válido"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [30, "El teléfono no puede superar los 30 caracteres"],
    },
    // Tipo de cliente: particular o empresa
    clientType: {
      type: String,
      enum: {
        values: ["private", "company"],
        message: "El tipo de cliente debe ser 'private' o 'company'",
      },
      default: "private",
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, "El mensaje no puede superar los 2000 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", messageSchema);

export default Message;
