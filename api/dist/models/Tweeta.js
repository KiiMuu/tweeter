"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
const TweetaSchema = new mongoose_1.Schema({
    content: {
        type: String,
        trim: true,
        text: true,
    },
    images: Array,
    postedBy: {
        type: ObjectId,
        ref: 'User',
    },
    isPinned: Boolean,
    likes: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
    retweeters: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
    retweetData: {
        type: ObjectId,
        ref: 'Tweeta',
    },
    replyTo: {
        type: ObjectId,
        ref: 'Tweeta',
    },
    // replies: [{
    //     content: {
    //         type: String,
    //         trim: true,
    //         text: true,
    //     },
    //     images: Array,
    //     postedBy: {
    //         type: ObjectId,
    //         ref: 'User',
    //     },
    //     isPinned: Boolean,
    //     likes: [{
    //         type: ObjectId,
    //         ref: 'User',
    //     }],
    //     retweeters: [{
    //         type: ObjectId,
    //         ref: 'User',
    //     }],
    //     retweetData: {
    //         type: ObjectId,
    //         ref: 'Tweeta',
    //     },
    //     date: {
    //         type: Date,
    //         default: Date.now,
    //     }
    // }],
}, {
    timestamps: true,
});
const Tweeta = mongoose_1.model('Tweeta', TweetaSchema);
exports.default = Tweeta;
