"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_1 = require("../controllers/user");
const validators_1 = __importDefault(require("../validators"));
const auth_1 = require("../validators/auth");
router.post('/user/signup', auth_1.validateSignUp, validators_1.default, user_1.signUp);
router.post('/user/signin', auth_1.validateSignIn, validators_1.default, user_1.signIn);
exports.default = router;
