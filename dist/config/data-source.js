"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionSource = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const user_entity_1 = require("../module/user/dtos-entities/user.entity");
const shortener_entity_1 = require("../module/shortener/shortener.entity");
const visit_entity_1 = require("../module/visit/visit.entity");
(0, dotenv_1.config)({ path: ".env" });
console.info("DB_TYPE: ", process.env.DB_TYPE);
console.info("DROPSCHEMA: ", process.env.DROPSCHEMA);
console.info("DB_DATABASE: ", process.env.DB_DATABASE);
console.info("DEVELOPMENT_MODE: ", process.env.DEVELOPMENT_MODE);
const DB_PASSWORD = process.env.DB_TYPE === "mysql" ? process.env.DB_PASSWORD || "" : process.env.DB_PASSWORD;
// Configuración de TypeORM
const typeOrmConfig = {
    type: process.env.DB_TYPE || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    username: process.env.DB_USERNAME || "root",
    password: DB_PASSWORD,
    database: process.env.DB_DATABASE || "my_db",
    synchronize: process.env.DROPSCHEMA === "true",
    dropSchema: process.env.DROPSCHEMA === "true",
    logging: ["error"],
    entities: [user_entity_1.UserEntity, shortener_entity_1.ShortUrlEntity, visit_entity_1.VisitEntity],
    migrations: ["dist/migrations/*{.ts,.js}"],
    subscribers: [],
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined, // Configuración SSL opcional
};
// Crear la instancia de DataSource
exports.AppDataSource = new typeorm_1.DataSource(typeOrmConfig);
// Exporta el tipo para uso global en otras partes de la app
exports.conectionSource = new typeorm_1.DataSource(typeOrmConfig);
//# sourceMappingURL=data-source.js.map