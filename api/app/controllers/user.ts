import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Tweeta from '../models/Tweeta';
import generateToken from '../helpers/generateToken';
import {
	BAD_REQUEST,
	CREATED,
	NOT_FOUND,
	OK,
	SERVER_ERROR,
	UNPROCESSABLE_ENTITY,
} from '../constants';
import { IUserInfo } from '../interfaces/user';
import { ITweeta, IMedia } from '../interfaces/tweeta';

const signUp = async (
	req: Request,
	res: Response
): Promise<object | string> => {
	try {
		const { name, username, email, password } = req.body;

		const isUserExists: boolean = await User.findOne({
			$or: [{ email }, { username }],
		});

		if (isUserExists) {
			return res.status(BAD_REQUEST).json({
				message: 'That user already in use, try another one.',
			});
		}

		const hashedPassword: string = await bcrypt.hash(password, 10);

		const user: IUserInfo = await new User({
			name,
			username,
			email,
			password: hashedPassword,
		}).save();

		return res.status(CREATED).json({
			user,
			token: generateToken(user._id),
		});
	} catch (error) {
		return res.status(SERVER_ERROR).json({
			message: error.message,
		});
	}
};

const signIn = async (
	req: Request,
	res: Response
): Promise<object | string> => {
	try {
		const { email, password } = req.body;

		const user: IUserInfo = await User.findOne({ email });

		if (!user) {
			return res.status(BAD_REQUEST).json({
				message: `That user has no record in ${process.env.APP_NAME} or may be deleted.`,
			});
		}

		const isMatch: boolean = await bcrypt.compare(password, user?.password);

		if (isMatch) {
			return res.status(OK).json({
				user,
				token: generateToken(user._id),
			});
		} else {
			return res.status(BAD_REQUEST).json({
				message: 'Invalid user password',
			});
		}
	} catch (error) {
		return res.status(SERVER_ERROR).json({
			message: error.message,
		});
	}
};

const getCurrentUser = async (
	req: Request,
	res: Response
): Promise<object | string> => {
	try {
		const user: IUserInfo = await User.findOne({
			email: req.user?.email,
		})
			.select('-password')
			.populate('following', '-password')
			.populate('followers', '-password');

		return res.json({
			user,
			token: generateToken(user._id),
		});
	} catch (error) {
		return res.status(SERVER_ERROR).json({
			message: error.message,
		});
	}
};

const getUser = async (
	req: Request,
	res: Response
): Promise<object | string> => {
	const username: string = req.params.username;

	try {
		const user: IUserInfo = await User.findOne({ username })
			.select('-password -likes -retweets')
			.populate(
				'following',
				'profilePic name username followers following'
			)
			.populate(
				'followers',
				'profilePic name username followers following'
			);

		await User.populate(user, {
			path: 'following',
			select: 'profilePic name username followers following',
		});
		await User.populate(user, {
			path: 'followers',
			select: 'profilePic name username followers following',
		});

		return res.json({ user });
	} catch (error) {
		return res.status(SERVER_ERROR).json({
			message: error.message,
		});
	}
};

const editProfile = async (req: Request, res: Response): Promise<object> => {
	try {
		const {
			profilePic,
			coverPhoto,
			name,
			bio,
			location,
			website,
			birthdate,
		} = req.body;

		const user: IUserInfo = await User.findById(req.user?._id).exec();

		if (!name) {
			return res.status(UNPROCESSABLE_ENTITY).json({
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
	} catch (error) {
		return res.status(SERVER_ERROR).json({
			message: error.message,
		});
	}
};

const follow = async (req: Request, res: Response): Promise<object> => {
	try {
		const userId: string = req.params.userId;
		let user: IUserInfo = await User.findById(userId).select('-password');

		if (user === null)
			return res.status(NOT_FOUND).json({
				message: 'User not found',
			});

		const isFollowing: boolean = user.followers?.includes(req.user?._id);
		let option: string = isFollowing ? '$pull' : '$addToSet';

		req.user = await User.findByIdAndUpdate(
			req.user?._id,
			{
				[option]: {
					following: userId,
				},
			},
			{ new: true }
		);

		user = await User.findByIdAndUpdate(
			userId,
			{
				[option]: {
					followers: req.user?._id,
				},
			},
			{ new: true }
		);

		await User.populate(user, {
			path: 'following',
			select: 'profilePic name username followers following',
		});
		await User.populate(user, {
			path: 'followers',
			select: 'profilePic name username followers following',
		});

		return res.status(OK).json({
			following: req.user?.following,
			followers: user.followers,
			followedUserId: user._id,
		});
	} catch (error) {
		return res.status(SERVER_ERROR).json({
			message: error.message,
		});
	}
};

const getUserProfileData = async (
	req: Request,
	res: Response
): Promise<object> => {
	const username: string = req.params.username;

	try {
		const user: IUserInfo = await User.findOne({ username }).exec();

		const userTweets: ITweeta[] = await Tweeta.find({
			postedBy: user?._id,
		})
			.populate('postedBy', 'name username profilePic')
			.populate('replyTo', '_id');
		const userLikes: ITweeta[] = await Tweeta.find({
			likes: user?._id,
		})
			.populate('postedBy', 'name username profilePic')
			.populate('replyTo', '_id');

		let tweets = [] as ITweeta[];
		let replies = [] as ITweeta[];
		let media = [] as IMedia[];

		for (let item of userTweets) {
			if (item.replyTo) {
				replies.push(item);
			} else {
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

		return res.status(OK).json({
			tweets,
			replies,
			likes: userLikes,
			media,
		});
	} catch (error) {
		return res.status(SERVER_ERROR).json({
			message: error.message,
		});
	}
};

export {
	signUp,
	signIn,
	getCurrentUser,
	getUser,
	editProfile,
	follow,
	getUserProfileData,
};
