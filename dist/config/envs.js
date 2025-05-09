"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_NAME = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
// src/config/envs.ts
const dotenv_1 = require("dotenv");
// import "dotenv/config";
(0, dotenv_1.config)({ path: ".env" });
exports.PORT = process.env.PORT || 3000;
exports.DB_HOST = process.env.DB_HOST || "localhost";
exports.DB_PORT = process.env.DB_PORT || 3306;
exports.DB_NAME = process.env.DB_NAME || "my_db";
exports.DB_USERNAME = process.env.DB_USERNAME || "root";
exports.DB_PASSWORD = process.env.DB_PASSWORD || "";
exports.ENV = {
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: parseInt(process.env.DB_PORT || "3306", 10),
    DB_TYPE: process.env.DB_TYPE || "mysql",
    DB_DATABASE: process.env.DB_DATABASE || "my_db",
    DB_USERNAME: process.env.DB_USERNAME || "root",
    DB_PASSWORD: process.env.DB_TYPE === "mysql" ? process.env.DB_PASSWORD || "" : process.env.DB_PASSWORD,
    SEED_DATA: process.env.SEED_DATA === "true",
    DROPSCHEMA: process.env.DROPSCHEMA === "true",
    DEV_MODE: process.env.DEV_MODE === "true",
    DB_SSL: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    WHATSAPP_VERIFY_TOKEN: process.env.WHATSAPP_VERIFY_TOKEN || "my_verify_token",
};
console.info("DB_TYPE: ", exports.ENV.DB_TYPE);
console.info("DB_DATABASE: ", exports.ENV.DB_DATABASE);
console.info("SEED_DATA: ", exports.ENV.SEED_DATA);
console.info("DROPSCHEMA: ", exports.ENV.DROPSCHEMA);
// Verificar si estamos en desarrollo
if (process.env.DEV_MODE === "true") {
    console.log("DEV_MODE: Modo desarrollo");
}
else {
    console.log("DEV_MODE: Modo producción");
}
//# sourceMappingURL=envs.js.map