"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
// Token de hora de Lima en formato HH:MM
morgan_1.default.token("hora-lima", () => {
    const dateLima = new Date().toLocaleString("en-US", { timeZone: "America/Lima" });
    const [hours, minutes] = new Date(dateLima).toTimeString().split(":");
    return `${hours}:${minutes}`;
});
// Token de status con color ANSI (sin librerías)
morgan_1.default.token("status-color", (_req, res) => {
    const status = res.statusCode;
    const color = status >= 500 ? "\x1b[31m" : // rojo
        status >= 400 ? "\x1b[33m" : // amarillo
            status >= 300 ? "\x1b[36m" : // cian
                status >= 200 ? "\x1b[32m" : // verde
                    "\x1b[0m"; // sin color
    return `${color}${status}\x1b[0m`;
});
// Exportar el middleware listo para usar
exports.morganLogger = (0, morgan_1.default)(":hora-lima | :method :url :status-color :response-time ms");
//# sourceMappingURL=morganLogger.js.map