"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTweeter = void 0;
const constants_1 = require("../constants");
const Tweeta_1 = __importDefault(require("../models/Tweeta"));
const User_1 = __importDefault(require("../models/User"));
const isEmptyObj = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};
const searchTweeter = async (req, res) => {
    var _a, _b;
    try {
        const { searchTerm } = req.query;
        let users = [];
        let tweets = [];
        if (searchTerm) {
            users = await User_1.default.find({
                $or: [
                    { name: new RegExp(searchTerm, 'i') },
                    { username: new RegExp(searchTerm, 'i') },
                ],
            })
                .select('-password')
                .exec();
            tweets = await Tweeta_1.default.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'postedBy',
                        foreignField: '_id',
                        as: 'users',
                    },
                },
                {
                    $unwind: {
                        path: '$users',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'tweetas',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'tweets',
                    },
                },
                {
                    $unwind: {
                        path: '$tweets',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        let: {
                            postedBy: '$tweets.postedBy',
                        },
                        as: 'tweets.postedBy',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$_id', '$$postedBy'],
                                    },
                                },
                            },
                            {
                                $project: {
                                    _id: '$_id',
                                    name: 1,
                                    username: 1,
                                    profilePic: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $unwind: {
                        path: '$tweets.postedBy',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'tweetas',
                        localField: 'replyTo',
                        foreignField: '_id',
                        as: 'tweets.replyTo',
                    },
                },
                {
                    $unwind: {
                        path: '$tweets.replyTo',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        let: {
                            postedBy: '$tweets.replyTo.postedBy',
                        },
                        as: 'tweets.replyTo.postedBy',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$_id', '$$postedBy'],
                                    },
                                },
                            },
                            {
                                $project: {
                                    _id: '$_id',
                                    name: 1,
                                    username: 1,
                                    profilePic: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $unwind: {
                        path: '$tweets.replyTo.postedBy',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'tweetas',
                        localField: 'retweetData',
                        foreignField: '_id',
                        as: 'tweets.retweetData',
                    },
                },
                {
                    $unwind: {
                        path: '$tweets.retweetData',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        let: {
                            postedBy: '$tweets.retweetData.postedBy',
                        },
                        as: 'tweets.retweetData.postedBy',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$_id', '$$postedBy'],
                                    },
                                },
                            },
                            {
                                $project: {
                                    _id: '$_id',
                                    name: 1,
                                    username: 1,
                                    profilePic: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $unwind: {
                        path: '$tweets.retweetData.postedBy',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $match: {
                        $or: [
                            {
                                'users.username': {
                                    $regex: new RegExp(searchTerm, 'i'),
                                },
                            },
                            {
                                'users.name': {
                                    $regex: new RegExp(searchTerm, 'i'),
                                },
                            },
                            {
                                'tweets.content': {
                                    $regex: new RegExp(searchTerm, 'i'),
                                },
                            },
                        ],
                    },
                },
                {
                    $group: {
                        _id: 0,
                        tweets: {
                            $push: '$tweets',
                        },
                    },
                },
            ]);
        }
        (_b = (_a = tweets[0]) === null || _a === void 0 ? void 0 : _a.tweets) === null || _b === void 0 ? void 0 : _b.forEach((tweeta) => {
            if (isEmptyObj(tweeta.replyTo)) {
                tweeta.replyTo = undefined;
            }
            if (isEmptyObj(tweeta.retweetData)) {
                tweeta.retweetData = undefined;
            }
        });
        return res.status(constants_1.OK).json({ users, tweets });
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.searchTweeter = searchTweeter;
