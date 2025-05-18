"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
class ProductController {
    constructor() {
        this.service = new product_service_1.ProductService();
        this.findAll = async (req, res) => {
            const products = await this.service.findAll();
            res.json(products);
        };
        this.findOne = async (req, res) => {
            const id = Number(req.params.id);
            const product = await this.service.findOne(id);
            if (!product)
                return res.status(404).json({ message: "Producto no encontrado" });
            res.json(product);
        };
        this.findSlug = async (req, res) => {
            const slug = req.params.slug;
            const product = await this.service.findSlug(slug);
            if (!product)
                return res.status(404).json({ message: "Producto no encontrado" });
            res.json(product);
        };
        this.create = async (req, res) => {
            const product = await this.service.create(req.body);
            res.status(201).json(product);
        };
        this.update = async (req, res) => {
            const id = Number(req.params.id);
            const updated = await this.service.update(id, req.body);
            if (!updated)
                return res.status(404).json({ message: "Producto no encontrado" });
            res.json(updated);
        };
        this.remove = async (req, res) => {
            const id = Number(req.params.id);
            const deleted = await this.service.remove(id);
            if (!deleted)
                return res.status(404).json({ message: "Producto no encontrado" });
            res.status(204).send();
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map