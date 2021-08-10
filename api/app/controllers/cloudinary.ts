import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import { BAD_REQUEST, OK } from '../constants';
import User from '../models/User';

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addTweetaImages = async (
	req: Request,
	res: Response
): Promise<object> => {
	try {
		const { images } = req.body;

		const result = await cloudinary.v2.uploader.upload(images, {
			public_id: `${Date.now()}`,
			resource_type: 'auto',
		});

		return res.status(OK).json({
			public_id: result.public_id,
			url: result.secure_url,
		});
	} catch (error) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const handleProfilePic = async (
	req: Request,
	res: Response
): Promise<object> => {
	try {
		const { profilePic, coverPhoto } = req.body;

		const result = await cloudinary.v2.uploader.upload(profilePic, {
			public_id: `${Date.now()}`,
			resource_type: 'auto',
		});

		return res.status(OK).json({
			public_id: result.public_id,
			url: result.secure_url,
		});
	} catch (error) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const handleCoverPhoto = async (
	req: Request,
	res: Response
): Promise<object> => {
	try {
		const { coverPhoto } = req.body;

		const result = await cloudinary.v2.uploader.upload(coverPhoto, {
			public_id: `${Date.now()}`,
			resource_type: 'auto',
		});

		return res.status(OK).json({
			public_id: result.public_id,
			url: result.secure_url,
		});
	} catch (error) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const removeTweetaImages = async (
	req: Request,
	res: Response
): Promise<object> => {
	try {
		const image_id = req.body.public_id;

		cloudinary.v2.uploader.destroy(image_id);

		return res.json({ image_id });
	} catch (error) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

export {
	addTweetaImages,
	removeTweetaImages,
	handleProfilePic,
	handleCoverPhoto,
};
