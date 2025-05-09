"use strict";
// src/config/data-source.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionSource = exports.AppDataSource = void 0;
require("reflect-metadata");
const envs_1 = require("./envs");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../module/user/dtos-entities/user.entity");
const shortener_entity_1 = require("../module/shortener/entities/shortener.entity");
const visit_entity_1 = require("../module/visit/visit.entity");
const options_entity_1 = require("../module/options/options.entity");
const whatsapp_message_entity_1 = require("../module/whatsapp/entities/whatsapp-message.entity");
const stat_entity_1 = require("../module/stat/entities/stat.entity");
const shortener_visit_entity_1 = require("../module/shortener/entities/shortener-visit.entity");
const entities = [
    user_entity_1.UserEntity,
    shortener_entity_1.ShortUrlEntity,
    visit_entity_1.VisitEntity,
    options_entity_1.OptionsEntity,
    whatsapp_message_entity_1.WhatsappMessageEntity,
    stat_entity_1.StatEntity,
    shortener_visit_entity_1.ShortenerVisitEntity,
    //
];
// Configuración de TypeORM
const typeOrmConfig = {
    type: envs_1.ENV.DB_TYPE,
    host: envs_1.ENV.DB_HOST,
    port: envs_1.ENV.DB_PORT,
    username: envs_1.ENV.DB_USERNAME,
    password: envs_1.ENV.DB_PASSWORD,
    database: envs_1.ENV.DB_DATABASE,
    synchronize: envs_1.ENV.DROPSCHEMA,
    dropSchema: envs_1.ENV.DROPSCHEMA,
    logging: ["error"],
    entities: entities,
    migrations: ["dist/migrations/*{.ts,.js}"],
    subscribers: [],
    ssl: envs_1.ENV.DB_SSL, // Configuración SSL opcional
};
// Crear la instancia de DataSource
exports.AppDataSource = new typeorm_1.DataSource(typeOrmConfig);
// Exporta el tipo para uso global en otras partes de la app
exports.conectionSource = new typeorm_1.DataSource(typeOrmConfig);
//# sourceMappingURL=data-source.js.map