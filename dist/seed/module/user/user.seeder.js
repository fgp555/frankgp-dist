"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = require("../../../config/data-source");
const user_entity_1 = require("../../../module/auth/user/dtos-entities/user.entity");
const seedUser = async () => {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.UserEntity);
        const hashedPass = (password) => bcrypt_1.default.hash(password, 10);
        const users = [
            {
                id: "54695949-687c-45f5-b7df-4a08d810f0ee",
                name: "SUPERADMIN",
                email: process.env.ADMIN_MAIL,
                password: await hashedPass(process.env.ADMIN_PASS),
                role: user_entity_1.UserRole.SUPERADMIN,
                photo: "https://i.postimg.cc/GmddyvS1/icon-user.webp",
                sendMail: false,
                isVisible: true,
            },
            {
                name: "Usuario Tester",
                email: "tester@fgp.one",
                password: await hashedPass("tester@fgp.one"),
            },
        ];
        for (const user of users) {
            const exists = await userRepository.findOneBy({ email: user.email });
            if (!exists) {
                const newUser = userRepository.create(user);
                await userRepository.save(newUser);
                console.log(`✅ Seeded: ${user.email}`);
            }
            else {
                console.log(`ℹ️ Already exists: ${user.email}`);
            }
        }
        console.log("🎉 User seeding completed");
    }
    catch (error) {
        console.error("❌ Error seeding users:", error);
    }
};
exports.seedUser = seedUser;
//# sourceMappingURL=user.seeder.js.map