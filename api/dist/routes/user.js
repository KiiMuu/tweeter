"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_1 = require("../controllers/user");
const isAuth_1 = require("../middlewares/isAuth");
const validators_1 = __importDefault(require("../validators"));
const auth_1 = require("../validators/auth");
router.post('/user/signup', auth_1.validateSignUp, validators_1.default, user_1.signUp);
router.post('/user/signin', auth_1.validateSignIn, validators_1.default, user_1.signIn);
router.get('/user/current', isAuth_1.isAuth, user_1.getCurrentUser);
router.get('/user/:username', isAuth_1.isAuth, user_1.getUser);
router.put('/user/editProfile', isAuth_1.isAuth, user_1.editProfile);
router.put('/user/:userId/follow', isAuth_1.isAuth, user_1.follow);
router.get('/user/:userId/tabs', isAuth_1.isAuth, user_1.getUserProfileData);
exports.default = router;
