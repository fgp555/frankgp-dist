"use strict";
// src/module/user/user.seed.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedController = void 0;
const user_seeder_1 = require("./module/user/user.seeder");
class SeedController {
    async seedUser(req, res, next) {
        try {
            await (0, user_seeder_1.seedUser)();
            res.json({ message: "Users seeded successfully" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SeedController = SeedController;
//# sourceMappingURL=seed.controller.js.map