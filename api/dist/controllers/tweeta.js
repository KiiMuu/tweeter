"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReply = exports.createReply = exports.tweetaRetweet = exports.tweetaLike = exports.removeTweeta = exports.getSingleTweeta = exports.getTweets = exports.createTweeta = void 0;
const Tweeta_1 = __importDefault(require("../models/Tweeta"));
const User_1 = __importDefault(require("../models/User"));
const constants_1 = require("../constants");
const createTweeta = async (req, res) => {
    var _a;
    try {
        const { content, images, } = req.body;
        let newTweeta = await Tweeta_1.default.create({
            content,
            images,
            postedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        await User_1.default.populate(newTweeta, { path: 'postedBy', select: '-password', });
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
            .populate('postedBy', '_id profilePic name username email')
            .populate('retweetData')
            .populate({
            path: 'retweetData replies',
            populate: {
                path: 'postedBy',
                select: '_id profilePic name username email',
                model: 'User',
            },
        });
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
            .populate('postedBy', '-password')
            .populate('retweetData')
            .populate({
            path: 'retweetData replies',
            populate: {
                path: 'postedBy',
                select: '_id profilePic name username email',
                model: 'User',
            },
        });
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
const tweetaLike = async (req, res) => {
    var _a, _b;
    try {
        const tweetaId = req.params.id;
        const user = await User_1.default.findOne({ email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email }).exec();
        const isLiked = (_b = user.likes) === null || _b === void 0 ? void 0 : _b.includes(tweetaId);
        const option = isLiked ? '$pull' : '$addToSet';
        await User_1.default.findByIdAndUpdate(user._id, {
            [option]: {
                likes: tweetaId,
            },
        }, { new: true, });
        const tweeta = await Tweeta_1.default.findByIdAndUpdate(tweetaId, {
            [option]: {
                likes: user._id,
            },
        }, { new: true, });
        await User_1.default.populate(tweeta, {
            path: 'postedBy',
            select: '-password',
        });
        return res.status(constants_1.OK).json(tweeta);
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.tweetaLike = tweetaLike;
const tweetaRetweet = async (req, res) => {
    var _a;
    try {
        const tweetaId = req.params.id;
        const user = await User_1.default.findOne({ email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email }).exec();
        let deletedTweeta = await Tweeta_1.default.findOneAndDelete({
            postedBy: user._id,
            retweetData: tweetaId,
        }).exec();
        const option = deletedTweeta !== null ? '$pull' : '$addToSet';
        let retweet = deletedTweeta;
        if (retweet === null) {
            retweet = await Tweeta_1.default.create({
                postedBy: user._id,
                retweetData: tweetaId,
            });
        }
        await User_1.default.findByIdAndUpdate(user._id, {
            [option]: {
                retweets: retweet._id,
            },
        }, { new: true, });
        const tweeta = await Tweeta_1.default.findByIdAndUpdate(tweetaId, {
            [option]: {
                retweeters: user._id,
            },
        }, { new: true, });
        await User_1.default.populate(tweeta, {
            path: 'postedBy',
            select: '_id profilePic name username email',
        });
        await Tweeta_1.default.populate(tweeta, {
            path: 'retweetData',
        });
        return res.status(constants_1.OK).json(tweeta);
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.tweetaRetweet = tweetaRetweet;
const createReply = async (req, res) => {
    var _a, _b;
    try {
        const { content, images, } = req.body;
        const tweeta = await Tweeta_1.default.findById(req.params.id).exec();
        let newReply = {
            content,
            images,
            postedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        };
        await User_1.default.populate(newReply, { path: 'postedBy', select: '-password', });
        (_b = tweeta === null || tweeta === void 0 ? void 0 : tweeta.replies) === null || _b === void 0 ? void 0 : _b.unshift(newReply);
        await (tweeta === null || tweeta === void 0 ? void 0 : tweeta.save());
        return res.status(constants_1.CREATED).json(newReply);
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.createReply = createReply;
const removeReply = async (req, res) => {
    var _a;
    try {
        const tweetaId = req.params.id;
        const replyId = req.params.replyId;
        const tweeta = await Tweeta_1.default.findById(tweetaId).exec();
        const reply = tweeta.replies.find((reply) => reply._id == replyId);
        if (!reply) {
            return res.status(constants_1.NOT_FOUND).json({ message: 'Reply does not exist.' });
        }
        const removedIndex = tweeta.replies.map((reply) => reply.postedBy).indexOf((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        tweeta.replies.splice(removedIndex, 1);
        await tweeta.save();
        return res.status(constants_1.OK).json(reply);
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.removeReply = removeReply;
