/** -------------------------------------------------------------------
 * ============================================ 
 * SCRIPT DE CREACIÓN DE USUARIO ADMIN
 * ============================================
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../db/models/User.model.js";
import {
  DB_USER,
  DB_PASS,
  CLUSTER,
  DATABASE,
  ADMIN_PASSWORD,
} from "../config/config.js";

// Crear el usuario admin
const createAdminUser = async () => {
  // La contraseña se lee del .env para no dejarla escrita en el código
  if (!ADMIN_PASSWORD) {
    console.error("❌ Falta ADMIN_PASSWORD en el archivo .env");
    process.exit(1);
  }
  const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${CLUSTER}/${DATABASE}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(url);
    console.log("✅ Conectado a MongoDB Atlas");
    const adminData = {
      username: "admin",
      email: "admin@negromate.com",
      password: ADMIN_PASSWORD,
      role: "admin",
    };
    // Buscar en la base de datos si ya hay un usuario con este email
    const adminExists = await User.findOne({ email: adminData.email });
    if (adminExists) {
      // Si existe, mostrar y salir
      console.log("⚠️ El usuario admin ya existe en la base de datos.");
      console.log(`Email: ${adminExists.email}`);
      console.log(`Role: ${adminExists.role}`);
      process.exit(0);
    }
    // Genera un salt aleatorio con 10 rondas
    const salt = await bcrypt.genSalt(10);
    // Combina la contraseña con el salt para crear el hash
    const hashedPassword = await bcrypt.hash(adminData.password, salt);
    // Crear el usuario admin
    const adminUser = await User.create({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Usuario admin creado exitosamente!");
    console.log("=======================================");
    console.log(`ID: ${adminUser._id}`);
    console.log(`Username: ${adminUser.username}`);
    console.log(`Email: ${adminUser.email}`);
    console.log(`Role: ${adminUser.role}`);
    console.log("=======================================");
    console.log("\n🔐 Credenciales de acceso:");
    console.log(`Email: ${adminData.email}`);
    console.log("Password: la definida en ADMIN_PASSWORD (.env)");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear usuario admin:", error);
    process.exit(1);
  }
};

createAdminUser();
