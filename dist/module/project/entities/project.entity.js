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
exports.ProjectEntity = exports.ProjectArchitecture = void 0;
const typeorm_1 = require("typeorm");
const project_image_entity_1 = require("./project-image.entity");
const project_link_entity_1 = require("./project-link.entity");
const project_technology_entity_1 = require("./project-technology.entity");
const project_collaborator_entity_1 = require("./project-collaborator.entity");
const project_dates_embeddable_1 = require("./project-dates.embeddable");
var ProjectArchitecture;
(function (ProjectArchitecture) {
    ProjectArchitecture["MONOLITHIC"] = "Monolithic";
    ProjectArchitecture["MICROSERVICES"] = "Microservices";
    ProjectArchitecture["MODULAR"] = "Modular";
    ProjectArchitecture["SERVERLESS"] = "Serverless";
    ProjectArchitecture["CLEAN"] = "Clean";
    ProjectArchitecture["HEXAGONAL"] = "Hexagonal";
})(ProjectArchitecture || (exports.ProjectArchitecture = ProjectArchitecture = {}));
let ProjectEntity = class ProjectEntity {
};
exports.ProjectEntity = ProjectEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ProjectArchitecture,
        default: ProjectArchitecture.MONOLITHIC,
    }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "architecture", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_image_entity_1.ProjectImageEntity, (image) => image.project, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)(() => project_dates_embeddable_1.ProjectDates),
    __metadata("design:type", project_dates_embeddable_1.ProjectDates)
], ProjectEntity.prototype, "dates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_link_entity_1.ProjectLinkEntity, (link) => link.project, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "links", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "youtube", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => project_technology_entity_1.TechnologyEntity, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "technologies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_collaborator_entity_1.CollaboratorEntity, (collab) => collab.project, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "collaborators", void 0);
exports.ProjectEntity = ProjectEntity = __decorate([
    (0, typeorm_1.Entity)("project")
], ProjectEntity);
//# sourceMappingURL=project.entity.js.map