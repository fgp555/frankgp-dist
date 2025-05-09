"use strict";
// src/utils/countBoot.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.countBoot = void 0;
const data_source_1 = require("../config/data-source");
const options_entity_1 = require("../module/options/options.entity");
const getTodayDateString = () => {
    const now = new Date();
    return now.toISOString().split("T")[0]; // YYYY-MM-DD
};
const getTimeString = () => {
    const now = new Date();
    return now.toISOString(); // Fecha y hora completa en UTC
};
const countBoot = async () => {
    const repo = data_source_1.AppDataSource.getRepository(options_entity_1.OptionsEntity);
    const BOOT_KEY = "boot_counter";
    const BOOT_DATE_KEY = "boot_counter_date";
    const BOOT_TIME_KEY = "boot_last_time";
    const today = getTodayDateString();
    const currentTime = getTimeString();
    let counterOpt = await repo.findOneBy({ key: BOOT_KEY });
    let dateOpt = await repo.findOneBy({ key: BOOT_DATE_KEY });
    let timeOpt = await repo.findOneBy({ key: BOOT_TIME_KEY });
    if (!counterOpt) {
        counterOpt = repo.create({ key: BOOT_KEY, type: "number", value: "1" });
        dateOpt = repo.create({ key: BOOT_DATE_KEY, type: "string", value: today });
    }
    else {
        const lastDate = dateOpt?.value;
        if (lastDate !== today) {
            counterOpt.value = "1";
            if (dateOpt)
                dateOpt.value = today;
            else
                dateOpt = repo.create({ key: BOOT_DATE_KEY, type: "string", value: today });
        }
        else {
            const count = parseInt(counterOpt.value || "0", 10);
            counterOpt.value = String(count + 1);
        }
    }
    if (!timeOpt) {
        timeOpt = repo.create({ key: BOOT_TIME_KEY, type: "string", value: currentTime });
    }
    else {
        timeOpt.value = currentTime;
    }
    await repo.save(counterOpt);
    if (dateOpt)
        await repo.save(dateOpt);
    if (timeOpt)
        await repo.save(timeOpt);
    console.log(`🔁 Boot count for ${today}: ${counterOpt.value}`);
    console.log(`🕒 Last boot time: ${currentTime}`);
};
exports.countBoot = countBoot;
//# sourceMappingURL=countBoot.js.map