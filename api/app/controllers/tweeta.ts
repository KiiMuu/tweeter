import { Request, Response } from 'express';
import Tweeta from '../models/Tweeta';
import User from '../models/User';
import Notification from '../models/Notification';
import { BAD_REQUEST, CREATED, OK } from '../constants';
import { IUserInfo } from '../interfaces/user';
import { ITweeta } from '../interfaces/tweeta';

const createTweeta = async (req: Request, res: Response): Promise<object> => {
	try {
		const { content, images, replyTo } = req.body;

		let tweetaData = {
			content,
			images,
			replyTo,
			postedBy: req.user?._id,
		};

		if (replyTo) {
			tweetaData.replyTo = replyTo;
		}

		let newTweeta: ITweeta = await Tweeta.create(tweetaData);

		await User.populate(newTweeta, {
			path: 'postedBy',
			select: '-password',
		});
		await Tweeta.populate(newTweeta, { path: 'replyTo' });

		if (newTweeta.replyTo) {
			await Notification.insertNotification(
				newTweeta.replyTo.postedBy,
				req.user?._id,
				'reply',
				newTweeta._id
			);
		}

		return res.status(CREATED).json(newTweeta);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const getTweets = async (req: Request, res: Response): Promise<object> => {
	try {
		// fetch tweets from user following only
		let tweets = await Tweeta.find({
			postedBy: { $in: req.user?.following },
		})
			.sort({ createdAt: -1 })
			.populate('postedBy', '_id profilePic name username email')
			.populate('retweetData')
			.populate('replyTo');

		tweets = await User.populate(tweets, { path: 'replyTo.postedBy' });
		await User.populate(tweets, { path: 'retweetData.postedBy' });

		return res.status(OK).json(tweets);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const getSingleTweeta = async (
	req: Request,
	res: Response
): Promise<object> => {
	try {
		const tweetaId: string = req.params.id;

		let tweeta = await Tweeta.findOne({ _id: tweetaId })
			.populate('postedBy', '-password')
			.populate('retweetData');

		let results: any = {
			tweeta: tweeta,
			replyTo: {},
		};

		if (tweeta.replyTo !== undefined) {
			results.replyTo = tweeta.replyTo;
		}

		results.replies = await Tweeta.find({ replyTo: tweetaId })
			.sort({ createdAt: -1 })
			.populate('postedBy', '_id profilePic name username email')
			.populate('retweetData')
			.populate('replyTo');

		results = await User.populate(results, { path: 'replyTo.postedBy' });
		await User.populate(results, { path: 'retweetData.postedBy' });

		return res.status(OK).json(results);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const removeTweeta = async (req: Request, res: Response): Promise<object> => {
	try {
		const tweetaId: string = req.params.id;

		const removedTweeta = await Tweeta.findByIdAndRemove(tweetaId);

		return res.status(OK).json(removedTweeta);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const tweetaLike = async (req: Request, res: Response): Promise<object> => {
	try {
		const tweetaId: string = req.params.id;
		const user: IUserInfo = await User.findOne({
			email: req.user?.email,
		}).exec();

		const isLiked: boolean = user.likes?.includes(tweetaId);
		const option: string = isLiked ? '$pull' : '$addToSet';

		await User.findByIdAndUpdate(
			user._id,
			{
				[option]: {
					likes: tweetaId,
				},
			},
			{ new: true }
		);

		const tweeta = await Tweeta.findByIdAndUpdate(
			tweetaId,
			{
				[option]: {
					likes: user._id,
				},
			},
			{ new: true }
		);

		await User.populate(tweeta, {
			path: 'postedBy',
			select: '-password',
		});

		if (!isLiked) {
			await Notification.insertNotification(
				tweeta.postedBy,
				user._id,
				'like',
				tweeta._id
			);
		}

		return res.status(OK).json(tweeta);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const tweetaRetweet = async (req: Request, res: Response): Promise<object> => {
	try {
		const tweetaId: string = req.params.id;
		const user: IUserInfo = await User.findOne({
			email: req.user?.email,
		}).exec();

		let deletedTweeta = await Tweeta.findOneAndDelete({
			postedBy: user._id,
			retweetData: tweetaId,
		}).exec();

		const option: string = deletedTweeta !== null ? '$pull' : '$addToSet';
		let retweet = deletedTweeta;

		if (retweet === null) {
			retweet = await Tweeta.create({
				postedBy: user._id,
				retweetData: tweetaId,
			});
		}

		await User.findByIdAndUpdate(
			user._id,
			{
				[option]: {
					retweets: retweet._id,
				},
			},
			{ new: true }
		);

		const tweeta = await Tweeta.findByIdAndUpdate(
			tweetaId,
			{
				[option]: {
					retweeters: user._id,
				},
			},
			{ new: true }
		);

		await User.populate(tweeta, {
			path: 'postedBy',
			select: '_id profilePic name username email',
		});

		await Tweeta.populate(tweeta, {
			path: 'retweetData replyTo',
		});

		if (!deletedTweeta) {
			await Notification.insertNotification(
				tweeta.postedBy,
				user._id,
				'retweet',
				tweeta._id
			);
		}

		return res.status(OK).json(tweeta);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const handlePin = async (req: Request, res: Response): Promise<object> => {
	try {
		const tweetaId: string = req.params.id;

		if (req.body.isPinned) {
			await Tweeta.updateMany(
				{ postedBy: req.user },
				{ isPinned: false }
			);
		}

		let result: { isPinned: boolean } = await Tweeta.findByIdAndUpdate(
			tweetaId,
			{
				isPinned: req.body.isPinned,
			},
			{ new: true }
		);

		await Tweeta.populate(result, {
			path: 'retweetData replyTo postedBy',
		});

		return res.status(OK).json(result);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const getWhatsHappening = async (
	req: Request,
	res: Response
): Promise<object> => {
	try {
		let yesterday = Date.now() - 1000 * 60 * 60 * 24;

		const joinedADayBefore = await User.find({
			createdAt: { $gt: yesterday },
			username: { $ne: req.user?.username },
		})
			.select('-password')
			.limit(3)
			.exec();

		const topLiked = await Tweeta.find({})
			.limit(3)
			.sort({ likes: -1 })
			.populate('postedBy', 'name username profilePic')
			.exec();

		return res.status(OK).json({ joinedADayBefore, topLiked });
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

export {
	createTweeta,
	getTweets,
	getSingleTweeta,
	removeTweeta,
	tweetaLike,
	tweetaRetweet,
	handlePin,
	getWhatsHappening,
};
