"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_entity_1 = require("./product.entity");
const data_source_1 = require("../../../config/data-source");
class ProductService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(product_entity_1.ProductEntity);
    }
    async findAll() {
        const results = await this.repo.find();
        return {
            page: 1,
            totalPages: 1,
            totalItems: 1,
            hasMore: false,
            results,
        };
    }
    async findOne(id) {
        return this.repo.findOneBy({ id });
    }
    async findSlug(slug) {
        return this.repo.findOneBy({ slug });
    }
    async create(data) {
        const product = this.repo.create(data);
        return this.repo.save(product);
    }
    async update(id, data) {
        const product = await this.repo.findOneBy({ id });
        if (!product)
            return null;
        this.repo.merge(product, data);
        return this.repo.save(product);
    }
    async remove(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map