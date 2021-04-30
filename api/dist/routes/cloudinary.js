"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const cloudinary_1 = require("../controllers/cloudinary");
const isAuth_1 = require("../middlewares/isAuth");
router.post('/tweeta/addTweetaImgs', isAuth_1.isAuth, cloudinary_1.addTweetaImages);
router.post('/tweeta/removeTweetaImgs', isAuth_1.isAuth, cloudinary_1.removeTweetaImages);
exports.default = router;
