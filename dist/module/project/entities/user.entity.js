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
exports.ProjectUserEntity = exports.UserLevel = void 0;
const typeorm_1 = require("typeorm");
const user_skill_entity_1 = require("./user-skill.entity");
const user_link_entity_1 = require("./user-link.entity");
var UserLevel;
(function (UserLevel) {
    // developer levels
    UserLevel["LEAD"] = "lead";
    UserLevel["JUNIOR"] = "junior";
    UserLevel["MIDDLE"] = "middle";
    UserLevel["SENIOR"] = "senior";
    UserLevel["EXPERT"] = "expert";
    // administration
    UserLevel["ADMIN"] = "admin";
    UserLevel["SUPERADMIN"] = "superadmin";
})(UserLevel || (exports.UserLevel = UserLevel = {}));
let ProjectUserEntity = class ProjectUserEntity {
};
exports.ProjectUserEntity = ProjectUserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectUserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: UserLevel, default: UserLevel.JUNIOR }),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_skill_entity_1.SkillUserEntity, { cascade: true, eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ProjectUserEntity.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_link_entity_1.UserLinkEntity, (link) => link.user, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], ProjectUserEntity.prototype, "links", void 0);
exports.ProjectUserEntity = ProjectUserEntity = __decorate([
    (0, typeorm_1.Entity)("project_user")
], ProjectUserEntity);
//# sourceMappingURL=user.entity.js.map