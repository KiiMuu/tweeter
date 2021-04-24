"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const constants_1 = require("../constants");
const runValidation = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(constants_1.UNPROCESSABLE_ENTITY).json({
            message: errors.array()[0].msg,
        });
    }
    next();
};
exports.default = runValidation;
