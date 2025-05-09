"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOptionDto = exports.CreateOptionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateOptionDto {
}
exports.CreateOptionDto = CreateOptionDto;
class UpdateOptionDto extends (0, mapped_types_1.PartialType)(CreateOptionDto) {
}
exports.UpdateOptionDto = UpdateOptionDto;
//# sourceMappingURL=option.dto.js.map