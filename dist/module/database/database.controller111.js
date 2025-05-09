"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const envs_1 = require("../../config/envs");
const backupsDir = path_1.default.resolve(__dirname, "../../../backups/db");
if (!fs_1.default.existsSync(backupsDir))
    fs_1.default.mkdirSync(backupsDir);
class DatabaseController {
    constructor() {
        this.backupsDir = backupsDir;
        this.backupMySQL = async (req, res) => {
            // Asegúrate de que el directorio de respaldos exista
            if (!fs_1.default.existsSync(this.backupsDir)) {
                fs_1.default.mkdirSync(this.backupsDir, { recursive: true });
            }
            const backupFile = path_1.default.join(this.backupsDir, `mysql-${new Date().toISOString().replace(/[:.Z]/g, "").replace("T", "-").slice(0, -3)}.sql`);
            // Comando mysqldump
            let command;
            if (envs_1.DB_PASSWORD) {
                // Si la contraseña está presente, incluirla en el comando
                command = `mysqldump -u ${envs_1.DB_USERNAME} -p${envs_1.DB_PASSWORD} -h ${envs_1.DB_HOST} ${envs_1.DB_NAME} > ${backupFile}`;
            }
            else {
                // Si la contraseña está vacía, no pasar la opción -p
                command = `mysqldump -u ${envs_1.DB_USERNAME} -h ${envs_1.DB_HOST} ${envs_1.DB_NAME} > ${backupFile}`;
            }
            // Ejecutar el comando
            (0, child_process_1.exec)(command, (error) => {
                if (error) {
                    res.status(500).json({ message: `Error generating backup: ${error.message}` });
                }
                else {
                    // Lógica para mantener solo los 7 backups más recientes
                    this.cleanupOldBackups(this.backupsDir);
                    res.status(200).json({ backupFile });
                }
            });
        };
    }
    // Método para limpiar los respaldos antiguos
    cleanupOldBackups(backupDir) {
        fs_1.default.readdir(backupDir, (err, files) => {
            if (err)
                return console.error("Error reading backup directory:", err);
            // Ordenar los archivos por fecha
            files.sort((a, b) => fs_1.default.statSync(path_1.default.join(backupDir, b)).mtime.getTime() - fs_1.default.statSync(path_1.default.join(backupDir, a)).mtime.getTime());
            // Mantener solo los 7 archivos más recientes
            files.slice(7).forEach((file) => {
                fs_1.default.unlink(path_1.default.join(backupDir, file), (err) => {
                    if (err)
                        console.error("Error deleting old backup:", err);
                });
            });
        });
    }
    async restore(req, res) {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const restorePath = req.file.path;
        const restoreCommand = `mysql -h ${envs_1.DB_HOST} -P ${envs_1.DB_PORT} -u ${envs_1.DB_USERNAME} -p${envs_1.DB_PASSWORD} ${envs_1.DB_NAME} < ${restorePath}`;
        (0, child_process_1.exec)(restoreCommand, (error) => {
            if (error) {
                console.error("❌ Error during restore:", error);
                return res.status(500).json({ message: "Restore failed", error });
            }
            res.status(200).json({ message: "✅ Database restored successfully" });
        });
    }
    async listBackups(req, res) {
        try {
            const files = fs_1.default
                .readdirSync(backupsDir)
                .filter((file) => file.endsWith(".sql"))
                .map((file) => {
                const filePath = path_1.default.join(backupsDir, file);
                const stats = fs_1.default.statSync(filePath);
                return {
                    name: file,
                    size: stats.size,
                    createdAt: stats.birthtime,
                };
            });
            res.json({ backups: files });
        }
        catch (error) {
            console.error("❌ Error listing backups:", error);
            res.status(500).json({ message: "Error listing backups", error });
        }
    }
}
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller111.js.map