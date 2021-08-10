"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const constants_1 = require("../constants");
const isAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // decoded => { id: '123456', iat: 3213123, exp: 3213432 }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = await User_1.default.findById(decoded.id).select('-password');
            next();
        }
        catch (error) {
            return res.status(constants_1.UNAUTHORIZED).json({
                message: error.message,
            });
        }
    }
    if (!token) {
        return res.status(constants_1.UNAUTHORIZED).json({
            message: 'Not authorized, no token',
        });
    }
};
exports.isAuth = isAuth;
