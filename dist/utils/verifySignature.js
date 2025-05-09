"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = verifySignature;
const crypto_1 = __importDefault(require("crypto"));
function verifySignature(appSecret, rawBody, signatureHeader) {
    if (!signatureHeader)
        return false;
    const expectedSignature = "sha256=" + crypto_1.default
        .createHmac("sha256", appSecret)
        .update(rawBody, "utf8")
        .digest("hex");
    try {
        return crypto_1.default.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expectedSignature));
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=verifySignature.js.map