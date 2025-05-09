"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitDataMock = void 0;
exports.countVisitMiddleware = countVisitMiddleware;
// Arreglo en memoria para almacenar visitas
exports.visitDataMock = [];
function countVisitMiddleware(req, res, next) {
    try {
        const visit = {
            id: exports.visitDataMock.length + 1, // simulamos un ID incremental
            path: req.path,
            visitedAt: new Date(),
        };
        exports.visitDataMock.push(visit);
    }
    catch (err) {
        console.error("Error saving visit (mock):", err);
    }
    next();
}
//# sourceMappingURL=visit.middleware.js.map