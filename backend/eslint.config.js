import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["node_modules"]),
  {
    files: ["**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      // Los parámetros que empiezan por _ se pueden dejar sin usar
      // (por ejemplo _next en el middleware de errores)
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
]);
