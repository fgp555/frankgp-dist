"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const email_service_1 = require("./email.service");
const error_middleware_1 = require("../../middleware/error.middleware");
const service = new email_service_1.EmailService();
class EmailController {
    async submit(req, res, next) {
        try {
            await service.sendContactEmail(req.body);
            res.json({ success: true, message: "¡Formulario enviado con éxito!" });
        }
        catch (error) {
            console.error("Error al enviar correo:", error);
            next(new error_middleware_1.AppError("Error al enviar el formulario", 500));
        }
    }
}
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map