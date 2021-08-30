"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTweeter = void 0;
const constants_1 = require("../constants");
const Tweeta_1 = __importDefault(require("../models/Tweeta"));
const searchTweeter = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        if (searchTerm) {
            await Tweeta_1.default.aggregate([
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
                        _id: '$_id',
                        users: { $addToSet: '$users' },
                        tweets: {
                            $addToSet: '$tweets',
                        },
                    },
                },
            ], (error, data) => {
                if (error) {
                    return res.status(constants_1.BAD_REQUEST).json({
                        message: error.message,
                    });
                }
                return res.status(constants_1.OK).json(data);
            });
        }
    }
    catch (error) {
        return res.status(constants_1.SERVER_ERROR).json({
            message: error.message,
        });
    }
};
exports.searchTweeter = searchTweeter;
