import { Request, Response } from 'express';
import Tweeta from '../models/Tweeta';
import User from '../models/User';
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '../constants';
// import { IReply } from '../interfaces/tweeta';

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

		let newTweeta = await Tweeta.create(tweetaData);

		await User.populate(newTweeta, {
			path: 'postedBy',
			select: '-password',
		});
		await Tweeta.populate(newTweeta, { path: 'replyTo' });

		return res.status(CREATED).json(newTweeta);
	} catch (error) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const getTweets = async (req: Request, res: Response): Promise<object> => {
	try {
		let tweets = await Tweeta.find({})
			.sort({ createdAt: -1 })
			.populate('postedBy', '_id profilePic name username email')
			.populate('retweetData')
			.populate('replyTo');

		tweets = await User.populate(tweets, { path: 'replyTo.postedBy' });
		await User.populate(tweets, { path: 'retweetData.postedBy' });

		return res.status(OK).json(tweets);
	} catch (error) {
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
		const tweetaId = req.params.id;

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
	} catch (error) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const removeTweeta = async (req: Request, res: Response): Promise<object> => {
	try {
		const tweetaId = req.params.id;

		const removedTweeta = await Tweeta.findByIdAndRemove(tweetaId);

		return res.status(OK).json(removedTweeta);
	} catch (error) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const tweetaLike = async (req: Request, res: Response): Promise<object> => {
	try {
		const tweetaId = req.params.id;
		const user = await User.findOne({ email: req.user?.email }).exec();

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

		return res.status(OK).json(tweeta);
	} catch (error) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const tweetaRetweet = async (req: Request, res: Response): Promise<object> => {
	try {
		const tweetaId = req.params.id;
		const user = await User.findOne({ email: req.user?.email }).exec();

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

		return res.status(OK).json(tweeta);
	} catch (error) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

// const createReply = async (req: Request, res: Response): Promise<object> => {
//     try {
//         const {
//             content,
//             images,
//         } = req.body;

//         const tweeta = await Tweeta.findById(req.params.id).exec();

//         let newReply = {
//             content,
//             images,
//             postedBy: req.user?._id,
//         }

//         await User.populate(newReply, { path: 'postedBy', select: '-password', });

//         tweeta?.replies?.unshift(newReply);

//         await tweeta?.save();

//         return res.status(CREATED).json(newReply);
//     } catch (error) {
//         return res.status(BAD_REQUEST).json({
//             message: error.message,
//         });
//     }
// }

// const removeReply = async (req: Request, res: Response): Promise<object> => {
//     try {
//         const tweetaId = req.params.id;
//         const replyId = req.params.replyId;

//         const tweeta = await Tweeta.findById(tweetaId).exec();

//         const reply = tweeta?.replies?.find((reply: IReply) => reply._id == replyId);

//         if (!reply) {
//             return res.status(NOT_FOUND).json({ message: 'Reply does not exist.' });
//         }

//         const removedIndex = tweeta?.replies?.map((reply: IReply) => reply.postedBy).indexOf(req.user?._id);

//         tweeta?.replies?.splice(removedIndex, 1);

//         await tweeta?.save();

//         return res.status(OK).json(reply);
//     } catch (error) {
//         return res.status(BAD_REQUEST).json({
//             message: error.message,
//         });
//     }
// }

export {
	createTweeta,
	getTweets,
	getSingleTweeta,
	removeTweeta,
	tweetaLike,
	tweetaRetweet,
	// createReply,
	// removeReply,
};
