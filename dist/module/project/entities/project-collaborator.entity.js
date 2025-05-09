"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCollaboratorEntity = void 0;
const typeorm_1 = require("typeorm");
const project_content_entity_1 = require("./project-content.entity");
let ProjectCollaboratorEntity = class ProjectCollaboratorEntity {
};
exports.ProjectCollaboratorEntity = ProjectCollaboratorEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectCollaboratorEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Array)
], ProjectCollaboratorEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectCollaboratorEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectCollaboratorEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectCollaboratorEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectCollaboratorEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)("json"),
    __metadata("design:type", Object)
], ProjectCollaboratorEntity.prototype, "links", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_content_entity_1.ProjectContent, (content) => content.collaborators),
    __metadata("design:type", project_content_entity_1.ProjectContent)
], ProjectCollaboratorEntity.prototype, "content", void 0);
exports.ProjectCollaboratorEntity = ProjectCollaboratorEntity = __decorate([
    (0, typeorm_1.Entity)()
], ProjectCollaboratorEntity);
//# sourceMappingURL=project-collaborator.entity.js.map