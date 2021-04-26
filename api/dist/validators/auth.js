"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignIn = exports.validateSignUp = void 0;
const express_validator_1 = require("express-validator");
const validateSignUp = [
    express_validator_1.check('name')
        .not()
        .isEmpty()
        .withMessage('Name can not be blank.')
        .isLength({ min: 2 })
        .withMessage('Name must has at least 2 characters long.'),
    express_validator_1.check('username')
        .not()
        .isEmpty()
        .withMessage('Username can not be blank.')
        .isLength({ min: 2 })
        .withMessage('Username must has at least 2 characters long.')
        .trim()
        .isLowercase()
        .withMessage('Username must contain small letters only.'),
    express_validator_1.check('email')
        .not()
        .isEmpty()
        .withMessage('Email can not be blank.')
        .isEmail()
        .withMessage('Invalid email format, try again.'),
    express_validator_1.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must has at least 6 characters long.')
];
exports.validateSignUp = validateSignUp;
const validateSignIn = [
    express_validator_1.check('email')
        .not()
        .isEmpty()
        .withMessage('Email can not be blank.')
        .isEmail()
        .withMessage('Invalid email format, try again.'),
    express_validator_1.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must has at least 6 characters long.')
];
exports.validateSignIn = validateSignIn;
