"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProduct = void 0;
const data_source_1 = require("../../../config/data-source");
const product_entity_1 = require("../../../module/store/product/product.entity");
const product_data_json_1 = __importDefault(require("./product.data.json"));
const seedProduct = async () => {
    const repo = data_source_1.AppDataSource.getRepository(product_entity_1.ProductEntity);
    const count = await repo.count();
    if (count === 0) {
        await repo.save(product_data_json_1.default);
        console.log("🌱 productSeeder seed complete ✅");
    }
    else {
        console.log("ℹ️ productSeeder table already has data. Seed skipped.");
    }
};
exports.seedProduct = seedProduct;
//# sourceMappingURL=product.seed.js.map