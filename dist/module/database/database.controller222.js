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
            if (!fs_1.default.existsSync(this.backupsDir)) {
                fs_1.default.mkdirSync(this.backupsDir, { recursive: true });
            }
            const backupFile = path_1.default.join(this.backupsDir, `mysql-${new Date().toISOString().replace(/[:.Z]/g, "").replace("T", "-").slice(0, -3)}.sql`);
            const command = envs_1.DB_PASSWORD
                ? `mysqldump -u ${envs_1.DB_USERNAME} -p${envs_1.DB_PASSWORD} -h ${envs_1.DB_HOST} ${envs_1.DB_NAME} > ${backupFile}`
                : `mysqldump -u ${envs_1.DB_USERNAME} -h ${envs_1.DB_HOST} ${envs_1.DB_NAME} > ${backupFile}`;
            (0, child_process_1.exec)(command, (error) => {
                if (error) {
                    res.status(500).json({ message: `Error generating backup: ${error.message}` });
                }
                else {
                    this.cleanupOldBackups(this.backupsDir);
                    res.status(200).json({ backupFile });
                }
            });
        };
    }
    cleanupOldBackups(backupDir) {
        fs_1.default.readdir(backupDir, (err, files) => {
            if (err)
                return console.error("Error reading backup directory:", err);
            files.sort((a, b) => fs_1.default.statSync(path_1.default.join(backupDir, b)).mtime.getTime() - fs_1.default.statSync(path_1.default.join(backupDir, a)).mtime.getTime());
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
        const command = `mysql -h ${envs_1.DB_HOST} -P ${envs_1.DB_PORT} -u ${envs_1.DB_USERNAME} -p${envs_1.DB_PASSWORD} ${envs_1.DB_NAME} < ${restorePath}`;
        (0, child_process_1.exec)(command, (error) => {
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
                .map((file) => ({ name: file }));
            res.status(200).json(files);
        }
        catch (error) {
            res.status(500).json({ message: "Error listing backups", error });
        }
    }
    // ✅ Eliminar base de datos
    async deleteDatabase(req, res) {
        const command = `mysql -u ${envs_1.DB_USERNAME} -p${envs_1.DB_PASSWORD} -h ${envs_1.DB_HOST} -e "DROP DATABASE IF EXISTS \`${envs_1.DB_NAME}\`;"`;
        (0, child_process_1.exec)(command, (error) => {
            if (error) {
                return res.status(500).json({ message: "❌ Failed to delete database", error: error.message });
            }
            res.status(200).json({ message: `✅ Database '${envs_1.DB_NAME}' deleted successfully` });
        });
    }
    // ✅ Renombrar base de datos
    async renameDatabase(req, res) {
        const { newName } = req.body;
        if (!newName)
            return res.status(400).json({ message: "newName is required in body" });
        const renameSQL = `
      CREATE DATABASE \`${newName}\`;
      USE \`${newName}\`;
      SHOW TABLES FROM \`${envs_1.DB_NAME}\`;
    `;
        const dumpCommand = `mysqldump -u ${envs_1.DB_USERNAME} -p${envs_1.DB_PASSWORD} -h ${envs_1.DB_HOST} ${envs_1.DB_NAME}`;
        const importCommand = `mysql -u ${envs_1.DB_USERNAME} -p${envs_1.DB_PASSWORD} -h ${envs_1.DB_HOST} ${newName}`;
        const dropOld = `mysql -u ${envs_1.DB_USERNAME} -p${envs_1.DB_PASSWORD} -h ${envs_1.DB_HOST} -e "DROP DATABASE \`${envs_1.DB_NAME}\`;"`;
        (0, child_process_1.exec)(`${dumpCommand} | ${importCommand}`, (error) => {
            if (error) {
                return res.status(500).json({ message: "❌ Failed to copy database", error: error.message });
            }
            (0, child_process_1.exec)(dropOld, (dropErr) => {
                if (dropErr) {
                    return res.status(500).json({ message: "Copied but failed to delete old database", error: dropErr.message });
                }
                res.status(200).json({ message: `✅ Database renamed from '${envs_1.DB_NAME}' to '${newName}'` });
            });
        });
    }
}
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller222.js.map