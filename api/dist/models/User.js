"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: 'https://res.cloudinary.com/ndsnvf0/image/upload/v1619469737/tweeter/17317730_tephvk.jpg',
    },
    coverPhoto: {
        type: String,
        default: 'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    website: {
        type: String,
    },
    birthdate: {
        type: Date,
    },
    likes: [
        {
            type: ObjectId,
            ref: 'Tweeta',
        },
    ],
    retweets: [
        {
            type: ObjectId,
            ref: 'Tweeta',
        },
    ],
    following: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
    followers: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
}, {
    timestamps: true,
});
const User = mongoose_1.model('User', UserSchema);
exports.default = User;
