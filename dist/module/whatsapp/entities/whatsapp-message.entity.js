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
exports.WhatsappMessageEntity = void 0;
const typeorm_1 = require("typeorm");
let WhatsappMessageEntity = class WhatsappMessageEntity {
};
exports.WhatsappMessageEntity = WhatsappMessageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WhatsappMessageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "WHATSAPP_ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "entry_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "contacts_wa_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "contacts_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "messages_from", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "messages_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "messages_timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "messages_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "messages_body", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "reaction_emoji", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "statuses_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "statuses_timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "statuses_recipient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "expiration_timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "pricing_billable", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "pricing_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }) // sent, delivered, read, failed, etc.
    ,
    __metadata("design:type", String)
], WhatsappMessageEntity.prototype, "statuses_status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappMessageEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappMessageEntity.prototype, "updatedAt", void 0);
exports.WhatsappMessageEntity = WhatsappMessageEntity = __decorate([
    (0, typeorm_1.Entity)("whatsapp_messages")
], WhatsappMessageEntity);
//# sourceMappingURL=whatsapp-message.entity.js.map