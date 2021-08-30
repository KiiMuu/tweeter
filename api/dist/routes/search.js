"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const search_1 = require("../controllers/search");
const isAuth_1 = require("../middlewares/isAuth");
router.post('/search', isAuth_1.isAuth, search_1.searchTweeter);
exports.default = router;
