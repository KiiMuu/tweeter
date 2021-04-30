"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTweeta = exports.getSingleTweeta = exports.getTweets = exports.createTweeta = void 0;
const Tweeta_1 = __importDefault(require("../models/Tweeta"));
const constants_1 = require("../constants");
const createTweeta = async (req, res) => {
    var _a;
    try {
        const { content, images, } = req.body;
        const newTweeta = await Tweeta_1.default.create({
            content,
            images,
            postedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        return res.status(constants_1.CREATED).json(newTweeta);
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.createTweeta = createTweeta;
const getTweets = async (req, res) => {
    try {
        const tweets = await Tweeta_1.default
            .find({})
            .sort({ createdAt: -1 })
            .populate('postedBy', '_id profilePic name username email');
        return res.status(constants_1.OK).json(tweets);
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.getTweets = getTweets;
const getSingleTweeta = async (req, res) => {
    try {
        const tweetaId = req.params.id;
        const tweeta = await Tweeta_1.default
            .findOne({ _id: tweetaId })
            .populate('postedBy', '_id profilePic name username email');
        return res.status(constants_1.OK).json(tweeta);
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.getSingleTweeta = getSingleTweeta;
const removeTweeta = async (req, res) => {
    try {
        const tweetaId = req.params.id;
        const removedTweeta = await Tweeta_1.default.findByIdAndRemove(tweetaId);
        return res.status(constants_1.OK).json(removedTweeta);
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.removeTweeta = removeTweeta;
