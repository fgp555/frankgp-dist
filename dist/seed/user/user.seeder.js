"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUser = void 0;
const data_source_1 = require("../../config/data-source");
const user_entity_1 = require("../../module/user/dtos-entities/user.entity");
const seedUser = async () => {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.UserEntity);
        const users = [
            {
                name: "Alice",
                email: "alice@example.com",
                password: "123456", // Idealmente deberías hashear la contraseña
            },
            {
                name: "Bob",
                email: "bob@example.com",
                password: "abcdef",
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