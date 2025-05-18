"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const data_source_1 = require("../../config/data-source");
const category_entity_1 = require("./dtos-entities/category.entity");
class CategoryService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(category_entity_1.CategoryEntity);
    }
    async create(data) {
        const existing = await this.repo.findOneBy({ name: data.name });
        if (existing) {
            return existing;
        }
        const category = this.repo.create(data);
        return await this.repo.save(category);
    }
    async findAll() {
        return await this.repo.find({ relations: ["courses"] });
    }
    async findOne(id) {
        return await this.repo.findOneBy({ id });
    }
    async findSlug(slug) {
        return await this.repo.findOne({
            where: { slug },
            relations: ["courses"],
        });
    }
    async update(id, data) {
        const category = await this.repo.findOneBy({ id });
        if (!category)
            return null;
        this.repo.merge(category, data);
        return await this.repo.save(category);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { message: "Category deleted successfully" };
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map