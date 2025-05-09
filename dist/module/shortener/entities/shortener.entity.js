"use strict";
// src/module/shortener/entities/shortener.entity.ts
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
exports.ShortUrlEntity = void 0;
const typeorm_1 = require("typeorm");
const shortener_visit_entity_1 = require("./shortener-visit.entity");
let ShortUrlEntity = class ShortUrlEntity {
};
exports.ShortUrlEntity = ShortUrlEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ShortUrlEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ShortUrlEntity.prototype, "shortCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShortUrlEntity.prototype, "originalUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ShortUrlEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ShortUrlEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => shortener_visit_entity_1.ShortenerVisitEntity, (visit) => visit.shortener),
    __metadata("design:type", Array)
], ShortUrlEntity.prototype, "visits", void 0);
exports.ShortUrlEntity = ShortUrlEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "shortener" })
], ShortUrlEntity);
//# sourceMappingURL=shortener.entity.js.map