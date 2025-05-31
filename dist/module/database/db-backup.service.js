"use strict";
// src/module/database/db-backup.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBBackupService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const mysqldump_1 = __importDefault(require("mysqldump"));
const promise_1 = __importDefault(require("mysql2/promise"));
class DBBackupService {
    constructor() {
        this.backupsDir = path_1.default.resolve(__dirname, "../../../backups/db");
        if (!fs_1.default.existsSync(this.backupsDir)) {
            fs_1.default.mkdirSync(this.backupsDir, { recursive: true });
        }
    }
    async backup() {
        const backupFile = path_1.default.join(this.backupsDir, `mysql-${new Date().toISOString().replace(/[:.Z]/g, "").replace("T", "-").slice(0, -3)}.sql`);
        const DB_PASSWORD = process.env.DB_TYPE === "mysql" ? process.env.DB_PASSWORD || "" : process.env.DB_PASSWORD;
        let command;
        if (DB_PASSWORD) {
            command = `mysqldump -u ${process.env.DB_USERNAME} -p${DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} > ${backupFile}`;
        }
        else {
            command = `mysqldump -u ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} > ${backupFile}`;
        }
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(command, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    this.cleanupOldBackups();
                    resolve(backupFile);
                }
            });
        });
    }
    async backupNodeJS() {
        const backupFile = path_1.default.join(this.backupsDir, `mysql-${new Date().toISOString().replace(/[:.Z]/g, "").replace("T", "-").slice(0, -3)}.sql`);
        try {
            await (0, mysqldump_1.default)({
                connection: {
                    host: process.env.DB_HOST || "localhost",
                    user: process.env.DB_USERNAME || "root",
                    password: process.env.DB_PASSWORD || "",
                    database: process.env.DB_DATABASE || "test",
                },
                dumpToFile: backupFile,
            });
            this.cleanupOldBackups();
            return backupFile;
        }
        catch (error) {
            throw new Error(`Error al generar el backup: ${error}`);
        }
    }
    async restore(backupFile) {
        const filePath = path_1.default.join(this.backupsDir, backupFile);
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("Backup file does not exist");
        }
        const DB_PASSWORD = process.env.DB_TYPE === "mysql" ? process.env.DB_PASSWORD || "" : process.env.DB_PASSWORD;
        let command;
        if (DB_PASSWORD) {
            command = `mysql -u ${process.env.DB_USERNAME} -p${DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} < ${filePath}`;
        }
        else {
            command = `mysql -u ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} < ${filePath}`;
        }
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(command, (error) => {
                if (error)
                    reject(error);
                else
                    resolve("Database restored successfully");
            });
        });
    }
    async restoreNodeJS(backupFile) {
        const filePath = path_1.default.join(this.backupsDir, backupFile);
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("Backup file does not exist");
        }
        const sql = fs_1.default.readFileSync(filePath, "utf8");
        const dbName = process.env.DB_DATABASE || "test";
        const connection = await promise_1.default.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "",
            multipleStatements: true, // 👈 ¡clave!
        });
        try {
            const dropAndCreate = `
        DROP DATABASE IF EXISTS \`${dbName}\`;
        CREATE DATABASE \`${dbName}\`;
        USE \`${dbName}\`;
      `;
            await connection.query(dropAndCreate + sql);
            await connection.end();
            return "Database restored successfully";
        }
        catch (error) {
            await connection.end();
            throw new Error(`Error during restore: ${error}`);
        }
    }
    list() {
        return fs_1.default
            .readdirSync(this.backupsDir)
            .filter((file) => file.endsWith(".sql"))
            .map((file) => {
            const filePath = path_1.default.join(this.backupsDir, file);
            const stats = fs_1.default.statSync(filePath);
            return {
                name: file,
                size: stats.size,
                createdAt: stats.birthtime,
            };
        });
    }
    delete(filename) {
        const filePath = path_1.default.join(this.backupsDir, filename);
        if (!fs_1.default.existsSync(filePath))
            throw new Error("Backup file not found");
        fs_1.default.unlinkSync(filePath);
    }
    rename(oldName, newName) {
        const oldPath = path_1.default.join(this.backupsDir, oldName);
        const newPath = path_1.default.join(this.backupsDir, newName);
        if (!fs_1.default.existsSync(oldPath))
            throw new Error("Backup file not found");
        fs_1.default.renameSync(oldPath, newPath);
    }
    cleanupOldBackups() {
        const files = fs_1.default
            .readdirSync(this.backupsDir)
            .filter((file) => file.endsWith(".sql"))
            .sort((a, b) => fs_1.default.statSync(path_1.default.join(this.backupsDir, b)).mtime.getTime() -
            fs_1.default.statSync(path_1.default.join(this.backupsDir, a)).mtime.getTime());
        files.slice(7).forEach((file) => {
            fs_1.default.unlink(path_1.default.join(this.backupsDir, file), (err) => {
                if (err)
                    console.error("Error deleting old backup:", err);
            });
        });
    }
    getBackupFilePath(filename) {
        const filePath = path_1.default.join(this.backupsDir, filename);
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("Backup file not found");
        }
        return filePath;
    }
    async uploadFile(tempPath, originalname) {
        if (!originalname.endsWith(".sql")) {
            fs_1.default.unlinkSync(tempPath); // Eliminar archivo temporal no válido
            throw new Error("Only .sql files are allowed");
        }
        const targetPath = path_1.default.join(this.backupsDir, originalname);
        fs_1.default.renameSync(tempPath, targetPath);
        return originalname;
    }
}
exports.DBBackupService = DBBackupService;
//# sourceMappingURL=db-backup.service.js.map