"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileData = exports.follow = exports.editProfile = exports.getUser = exports.getCurrentUser = exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const Tweeta_1 = __importDefault(require("../models/Tweeta"));
const generateToken_1 = __importDefault(require("../helpers/generateToken"));
const constants_1 = require("../constants");
const signUp = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const isUserExists = await User_1.default.findOne({
            $or: [{ email }, { username }],
        });
        if (isUserExists) {
            return res.status(constants_1.BAD_REQUEST).json({
                message: 'That user already in use, try another one.',
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await new User_1.default({
            name,
            username,
            email,
            password: hashedPassword,
        }).save();
        return res.status(constants_1.CREATED).json({
            user,
            token: generateToken_1.default(user._id),
        });
    }
    catch (error) {
        return res.status(constants_1.SERVER_ERROR).json({
            message: error.message,
        });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(constants_1.BAD_REQUEST).json({
                message: `That user has no record in ${process.env.APP_NAME} or may be deleted.`,
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (isMatch) {
            return res.status(constants_1.OK).json({
                user,
                token: generateToken_1.default(user._id),
            });
        }
        else {
            return res.status(constants_1.BAD_REQUEST).json({
                message: 'Invalid user password',
            });
        }
    }
    catch (error) {
        return res.status(constants_1.SERVER_ERROR).json({
            message: error.message,
        });
    }
};
exports.signIn = signIn;
const getCurrentUser = async (req, res) => {
    var _a;
    try {
        const user = await User_1.default.findOne({
            email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email,
        })
            .select('-password')
            .populate('following', '-password')
            .populate('followers', '-password');
        return res.json({
            user,
            token: generateToken_1.default(user._id),
        });
    }
    catch (error) {
        return res.status(constants_1.SERVER_ERROR).json({
            message: error.message,
        });
    }
};
exports.getCurrentUser = getCurrentUser;
const getUser = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User_1.default.findOne({ username })
            .select('-password -likes -retweets')
            .populate('following', 'profilePic name username followers following')
            .populate('followers', 'profilePic name username followers following');
        await User_1.default.populate(user, {
            path: 'following',
            select: 'profilePic name username followers following',
        });
        await User_1.default.populate(user, {
            path: 'followers',
            select: 'profilePic name username followers following',
        });
        return res.json({ user });
    }
    catch (error) {
        return res.status(constants_1.SERVER_ERROR).json({
            message: error.message,
        });
    }
};
exports.getUser = getUser;
const editProfile = async (req, res) => {
    var _a;
    try {
        const { profilePic, coverPhoto, name, bio, location, website, birthdate, } = req.body;
        const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).exec();
        if (!name) {
            return res.status(constants_1.UNPROCESSABLE_ENTITY).json({
                message: 'Name cannot be blank.',
            });
        }
        user.profilePic = profilePic || user.profilePic;
        user.coverPhoto = coverPhoto || user.coverPhoto;
        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.location = location || user.location;
        user.website = website || user.website;
        user.birthdate = birthdate || user.birthdate;
        const updatedUser = await user.save();
        return res.json(updatedUser);
    }
    catch (error) {
        return res.status(constants_1.SERVER_ERROR).json({
            message: error.message,
        });
    }
};
exports.editProfile = editProfile;
const follow = async (req, res) => {
    var _a, _b, _c, _d, _e;
    try {
        const userId = req.params.userId;
        let user = await User_1.default.findById(userId).select('-password');
        if (user === null)
            return res.status(constants_1.NOT_FOUND).json({
                message: 'User not found',
            });
        const isFollowing = (_a = user.followers) === null || _a === void 0 ? void 0 : _a.includes((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
        let option = isFollowing ? '$pull' : '$addToSet';
        req.user = await User_1.default.findByIdAndUpdate((_c = req.user) === null || _c === void 0 ? void 0 : _c._id, {
            [option]: {
                following: userId,
            },
        }, { new: true });
        user = await User_1.default.findByIdAndUpdate(userId, {
            [option]: {
                followers: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
            },
        }, { new: true });
        await User_1.default.populate(user, {
            path: 'following',
            select: 'profilePic name username followers following',
        });
        await User_1.default.populate(user, {
            path: 'followers',
            select: 'profilePic name username followers following',
        });
        return res.status(constants_1.OK).json({
            following: (_e = req.user) === null || _e === void 0 ? void 0 : _e.following,
            followers: user.followers,
            followedUserId: user._id,
        });
    }
    catch (error) {
        return res.status(constants_1.SERVER_ERROR).json({
            message: error.message,
        });
    }
};
exports.follow = follow;
const getUserProfileData = async (req, res) => {
    var _a;
    try {
        const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).exec();
        const userTweets = await Tweeta_1.default.find({
            postedBy: user === null || user === void 0 ? void 0 : user._id,
        }).populate('postedBy', 'name username email');
        const userLikes = await Tweeta_1.default.find({
            likes: user === null || user === void 0 ? void 0 : user._id,
        }).populate('postedBy', 'name username email');
        let tweets = [];
        let replies = [];
        let media = [];
        for (let item of userTweets) {
            if (item.replyTo) {
                replies.push(item);
            }
            else {
                tweets.push(item);
            }
            if (item.images.length) {
                media.push({
                    images: item.images,
                    content: item.content,
                    postedBy: {
                        name: item.postedBy.name,
                        username: item.postedBy.username,
                        email: item.postedBy.email,
                    },
                });
            }
        }
        return res.status(constants_1.OK).json({
            tweets,
            replies,
            likes: userLikes,
            media,
        });
    }
    catch (error) {
        return res.status(constants_1.SERVER_ERROR).json({
            message: error.message,
        });
    }
};
exports.getUserProfileData = getUserProfileData;
