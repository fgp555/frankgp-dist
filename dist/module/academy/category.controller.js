"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
class CategoryController {
    constructor() {
        this.service = new category_service_1.CategoryService();
    }
    async create(req, res) {
        const category = await this.service.create(req.body);
        res.json(category);
    }
    async findAll(_req, res) {
        const categories = await this.service.findAll();
        res.json(categories);
    }
    async findOne(req, res) {
        const id = parseInt(req.params.id);
        const category = await this.service.findOne(id);
        if (!category)
            return res.status(404).json({ message: "Category not found" });
        res.json(category);
    }
    async findSlug(req, res) {
        const slug = req.params.slug;
        const category = await this.service.findSlug(slug);
        if (!category)
            return res.status(404).json({ message: "Category not found" });
        res.json(category);
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const updated = await this.service.update(id, req.body);
        res.json(updated);
    }
    async remove(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.service.remove(id);
        res.json(result);
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map