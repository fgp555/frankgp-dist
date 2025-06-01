"use strict";
// src/module/database/database.cron.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const db_backup_service_1 = require("./db-backup.service");
const dbBackupService = new db_backup_service_1.DBBackupService();
// Ejecutar todos los días a medianoche (12:00 AM)
node_cron_1.default.schedule("0 0 * * *", async () => {
    console.log("⏰ Ejecutando backup programado a las 12:00 AM hora Perú...");
    try {
        const result = await dbBackupService.backupNodeJS();
        console.log("✅ Backup realizado:", result);
    }
    catch (err) {
        console.error("❌ Error en el backup programado:", err);
    }
}, {
    timezone: "America/Lima",
});
// // Ejecutar cada minuto (para pruebas)
// cron.schedule("* * * * *", async () => {
//   console.log("🧪 Ejecutando backup de prueba cada minuto...");
//   try {
//     const result = await dbBackupService.backup();
//     console.log("✅ Backup de prueba realizado:", result);
//   } catch (err) {
//     console.error("❌ Error en el backup de prueba:", err);
//   }
// });
/*
0 12 * * *   ->   Ejecuta todos los días a las 12:00 PM
│ │ │ │ │
│ │ │ │ └──── día de la semana (0 - 7) (domingo = 0 o 7)
│ │ │ └────── mes (1 - 12)
│ │ └──────── día del mes (1 - 31)
│ └────────── hora (0 - 23)
└──────────── minuto (0 - 59)
*/
/*
┌───────────── minuto (0 - 59)
│ ┌───────────── hora (0 - 23)
│ │ ┌───────────── día del mes (1 - 31)
│ │ │ ┌───────────── mes (1 - 12)
│ │ │ │ ┌───────────── día de la semana (0 - 6) (domingo = 0 o 7)
│ │ │ │ │
│ │ │ │ │
* * * * *  comando a ejecutar

*/
/*
🧠 Ejemplos prácticos
* * * * *
→ Ejecuta cada minuto.

0 * * * *
→ Ejecuta al minuto 0 de cada hora (por ejemplo, 13:00, 14:00, etc).

0 12 * * *
→ Ejecuta a las 12:00 PM todos los días.

30 18 * * 5
→ Ejecuta a las 6:30 PM los viernes.
*/
//# sourceMappingURL=database.cron.js.map