"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = exports.getCurrentUser = exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
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
        const user = await User_1.default.findOne({ email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email }).select('-password');
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
