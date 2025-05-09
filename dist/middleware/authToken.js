"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authToken = (req, res, next) => {
    const { token } = req.headers;
    console.log(req.headers);
    console.log(token);
    // next();
    if (token === "autenticado")
        next();
    else
        res.status(400).json({ message: "Error. Falta autenticación" });
};
exports.default = authToken;
//# sourceMappingURL=authToken.js.map