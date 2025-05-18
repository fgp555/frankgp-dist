"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courses_routes_1 = __importDefault(require("./courses.routes"));
const lesson_routes_1 = __importDefault(require("./lesson.routes"));
const section_routes_1 = __importDefault(require("./section.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const router = (0, express_1.Router)();
router.use("/courses", courses_routes_1.default);
router.use("/lessons", lesson_routes_1.default);
router.use("/sections", section_routes_1.default);
router.use("/categories", category_routes_1.default);
exports.default = router;
//# sourceMappingURL=academy.index.routes.js.map