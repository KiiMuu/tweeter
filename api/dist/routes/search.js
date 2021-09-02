"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const search_1 = require("../controllers/search");
router.post('/search', search_1.searchTweeter);
exports.default = router;
