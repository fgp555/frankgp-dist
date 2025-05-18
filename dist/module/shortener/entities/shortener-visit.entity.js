"use strict";
// src/module/shortener/entities/shortener-visit.entity.ts
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
exports.ShortenerVisitEntity = void 0;
const typeorm_1 = require("typeorm");
const shortener_entity_1 = require("./shortener.entity");
let ShortenerVisitEntity = class ShortenerVisitEntity {
};
exports.ShortenerVisitEntity = ShortenerVisitEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ShortenerVisitEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ShortenerVisitEntity.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ShortenerVisitEntity.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ShortenerVisitEntity.prototype, "referrer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ShortenerVisitEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ShortenerVisitEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ShortenerVisitEntity.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ShortenerVisitEntity.prototype, "visitedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shortener_entity_1.ShortenerEntity, (shortUrl) => shortUrl.visits, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "shortenerId" }),
    __metadata("design:type", shortener_entity_1.ShortenerEntity)
], ShortenerVisitEntity.prototype, "shortener", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ShortenerVisitEntity.prototype, "shortenerId", void 0);
exports.ShortenerVisitEntity = ShortenerVisitEntity = __decorate([
    (0, typeorm_1.Entity)("shortener_visit")
], ShortenerVisitEntity);
//# sourceMappingURL=shortener-visit.entity.js.map