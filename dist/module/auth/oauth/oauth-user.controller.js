"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthUserController = void 0;
const oauth_user_service_1 = require("./oauth-user.service");
class OAuthUserController {
    constructor() {
        this.service = new oauth_user_service_1.OAuthUserService();
        this.findAll = async (req, res) => {
            const users = await this.service.findAll();
            res.json(users);
        };
        this.findById = async (req, res) => {
            const user = await this.service.findById(Number(req.params.id));
            if (!user)
                return res.status(404).json({ message: "User not found" });
            res.json(user);
        };
        this.remove = async (req, res) => {
            await this.service.remove(Number(req.params.id));
            res.status(204).send();
        };
    }
}
exports.OAuthUserController = OAuthUserController;
//# sourceMappingURL=oauth-user.controller.js.map