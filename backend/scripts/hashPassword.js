/** -------------------------------------------------------------------
 * ============================================ 
 * HASH DE CONTRASEÑAS
 * ============================================
 */

import bcrypt from "bcrypt";
import { ADMIN_PASSWORD } from "../config/config.js";

// Contraseña a cifrar: la que se pase como argumento o ADMIN_PASSWORD del .env
// Uso: node scripts/hashPassword.js [contraseña]
const plainPassword = process.argv[2] || ADMIN_PASSWORD;
const hashPassword = async () => {
  if (!plainPassword) {
    console.error("❌ Indica una contraseña o define ADMIN_PASSWORD en el .env");
    process.exit(1);
  }
  const salt = await bcrypt.genSalt(10);
  // Crear el hash combinando la contraseña con el salt
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  console.log("=======================================");
  console.log("Contraseña en texto plano:", plainPassword);
  console.log("Contraseña hasheada:", hashedPassword);
  console.log("=======================================");
  console.log('\nUsa este valor en el campo "password" de MongoDB:');
  console.log(hashedPassword);
  console.log(
    "\n💡 RECUERDA: Cada vez que ejecutes este script, el hash será diferente"
  );
  console.log(
    "   debido al salt aleatorio, pero todos los hashes serán válidos para"
  );
  console.log("   la misma contraseña original.");
};

hashPassword();
