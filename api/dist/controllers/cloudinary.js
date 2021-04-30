"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTweetaImages = exports.addTweetaImages = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const constants_1 = require("../constants");
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const addTweetaImages = async (req, res) => {
    try {
        const { images } = req.body;
        const result = await cloudinary_1.default.v2.uploader.upload(images, {
            public_id: `${Date.now()}`,
            resource_type: 'auto',
        });
        return res.status(constants_1.OK).json({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.addTweetaImages = addTweetaImages;
const removeTweetaImages = async (req, res) => {
    try {
        const image_id = req.body.public_id;
        cloudinary_1.default.v2.uploader.destroy(image_id);
        return res.json({ image_id });
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({
            message: error.message,
        });
    }
};
exports.removeTweetaImages = removeTweetaImages;
