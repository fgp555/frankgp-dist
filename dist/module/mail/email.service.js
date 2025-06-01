"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MAIL_HOST, MAIL_PORT, MAIL_USER_FROM, MAIL_PASS_FROM, MAIL_USER_TO_CC } = process.env;
// console.log({ MAIL_HOST, MAIL_PORT, MAIL_USER_FROM, MAIL_PASS_FROM, MAIL_USER_TO_CC });
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: MAIL_HOST,
            port: Number(MAIL_PORT),
            secure: true,
            auth: {
                user: MAIL_USER_FROM,
                pass: MAIL_PASS_FROM,
            },
            // tls: {
            //   rejectUnauthorized: false, // ⚠️ Solo usar temporalmente si tienes error de certificado
            // },
        });
    }
    async sendContactEmail(data) {
        const { name, email, subject, message, currentUrl } = data;
        const bodyMessage = `\n\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}\nEnviado desde: ${currentUrl}`;
        const userMessage = {
            from: `"${name}" <${MAIL_USER_FROM}>`,
            to: email,
            subject: subject || "Gracias por contactarnos",
            text: `Gracias por escribirnos, te responderemos pronto.${bodyMessage}`,
        };
        const ccMessage = {
            from: `"${name}" <${MAIL_USER_FROM}>`,
            to: MAIL_USER_TO_CC,
            subject: "Tienes un nuevo formulario",
            text: `Un usuario ha enviado un nuevo formulario.${bodyMessage}`,
        };
        // Enviar ambos correos
        await this.transporter.sendMail(userMessage);
        await this.transporter.sendMail(ccMessage);
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map