"use strict";
// src/module/database/db-backup.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBBackupController = void 0;
const error_middleware_1 = require("../../middleware/error.middleware");
const db_backup_service_1 = require("./db-backup.service");
class DBBackupController {
    constructor() {
        this.dbBackupService = new db_backup_service_1.DBBackupService();
        this.backup = async (req, res, next) => {
            try {
                const result = await this.dbBackupService.backup();
                res.json({ message: result });
            }
            catch (error) {
                next(new error_middleware_1.AppError(`Error al generar el backup: ${error.message}`, 500));
            }
        };
        this.backupNodeJS = async (req, res, next) => {
            try {
                const result = await this.dbBackupService.backupNodeJS();
                res.json({ message: result });
            }
            catch (error) {
                next(new error_middleware_1.AppError(`Error al generar el backup: ${error.message}`, 500));
            }
        };
        this.restore = async (req, res, next) => {
            const { backupfile } = req.params;
            try {
                const result = await this.dbBackupService.restore(backupfile);
                res.json({ message: result });
            }
            catch (error) {
                next(new error_middleware_1.AppError(`Error al restaurar la base de datos: ${error.message}`, 500));
            }
        };
        this.restoreNodeJS = async (req, res, next) => {
            const { backupfile } = req.params;
            try {
                const result = await this.dbBackupService.restoreNodeJS(backupfile);
                res.json({ message: result });
            }
            catch (error) {
                next(new error_middleware_1.AppError(`Error al restaurar la base de datos: ${error.message}`, 500));
            }
        };
        this.list = async (req, res, next) => {
            try {
                const backups = this.dbBackupService.list();
                res.json({ backups });
            }
            catch (error) {
                next(new error_middleware_1.AppError(`Error al listar los backups: ${error.message}`, 500));
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const { filename } = req.params;
                this.dbBackupService.delete(filename);
                res.status(200).json({ message: "Backup eliminado" });
            }
            catch (error) {
                next(new error_middleware_1.AppError(`Error al eliminar el backup: ${error.message}`, 500));
            }
        };
        this.rename = async (req, res, next) => {
            try {
                const { filename } = req.params;
                const { newName } = req.body;
                if (!newName || !newName.endsWith(".sql")) {
                    throw new error_middleware_1.AppError("El nuevo nombre debe tener la extensión .sql", 400);
                }
                this.dbBackupService.rename(filename, newName);
                res.status(200).json({ message: "Backup renombrado", newName });
            }
            catch (error) {
                next(new error_middleware_1.AppError(`Error al renombrar el backup: ${error.message}`, 500));
            }
        };
        this.download = async (req, res, next) => {
            const { filename } = req.params;
            try {
                const filePath = this.dbBackupService.getBackupFilePath(filename);
                res.download(filePath, filename, (err) => {
                    if (err) {
                        next(new error_middleware_1.AppError("Error downloading the backup file", 500));
                    }
                });
            }
            catch (error) {
                next(new error_middleware_1.AppError(error.message, 404));
            }
        };
    }
    async upload(req, res, next) {
        try {
            if (!req.file) {
                throw new error_middleware_1.AppError("No file uploaded", 400);
            }
            const { originalname, path: tempPath } = req.file;
            const filename = await this.dbBackupService.uploadFile(tempPath, originalname);
            res.status(200).json({ message: "File uploaded successfully", filename });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.DBBackupController = DBBackupController;
//# sourceMappingURL=db-backup.controller.js.map