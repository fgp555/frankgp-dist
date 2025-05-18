"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFrontendFallback = setupFrontendFallback;
// import { Express } from "express";
// import express from "express";
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Configura un fallback para una app SPA (React, Vue, etc.)
 * que se renderiza del lado del cliente.
 *
 * @param app Instancia de Express
 * @param clientBuildPath Ruta absoluta al directorio de build del frontend
 */
function setupFrontendFallback(app, clientBuildPath) {
    if (!fs_1.default.existsSync(clientBuildPath)) {
        console.warn(`[setupFrontendFallback] WARNING: Build path not found: ${clientBuildPath}`);
        return;
    }
    // Servir archivos estáticos
    app.use((0, express_1.static)(clientBuildPath));
    // Fallback para rutas del frontend que no coincidan con una API
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path_1.default.join(clientBuildPath, "index.html"));
    });
}
//# sourceMappingURL=setupFrontendFallback.js.map