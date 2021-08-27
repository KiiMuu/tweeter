"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const tweeta_1 = require("../controllers/tweeta");
const isAuth_1 = require("../middlewares/isAuth");
router.post('/tweeta/create', isAuth_1.isAuth, tweeta_1.createTweeta);
router.get('/tweeta/getTweets', isAuth_1.isAuth, tweeta_1.getTweets);
router.get('/tweeta/getSingleTweeta/:id', isAuth_1.isAuth, tweeta_1.getSingleTweeta);
router.delete('/tweeta/remove/:id', isAuth_1.isAuth, tweeta_1.removeTweeta);
router.put('/tweeta/:id/like', isAuth_1.isAuth, tweeta_1.tweetaLike);
router.post('/tweeta/:id/retweet', isAuth_1.isAuth, tweeta_1.tweetaRetweet);
router.put('/tweeta/:id/pin', isAuth_1.isAuth, tweeta_1.handlePin);
exports.default = router;
