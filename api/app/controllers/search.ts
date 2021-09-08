import { Request, Response } from 'express';
import { BAD_REQUEST, OK } from '../constants';
import { ITweeta } from '../interfaces/tweeta';
import Tweeta from '../models/Tweeta';
import User from '../models/User';

interface Search {
	searchTerm: string;
}

const isEmptyObj = (obj: ITweeta | undefined) => {
	return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

const searchTweeter = async (req: Request, res: Response) => {
	try {
		const { searchTerm } = req.query as unknown as Search;

		let users = [];
		let tweets = [];

		if (searchTerm) {
			users = await User.find({
				$or: [
					{ name: new RegExp(searchTerm, 'i') },
					{ username: new RegExp(searchTerm, 'i') },
				],
			})
				.select('-password')
				.exec();

			tweets = await Tweeta.aggregate([
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
					$unwind: {
						path: '$tweets.retweetData.postedBy',
						preserveNullAndEmptyArrays: true,
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
						_id: 0,
						tweets: {
							$push: '$tweets',
						},
					},
				},
			]);
		}

		tweets[0]?.tweets?.forEach((tweeta: ITweeta) => {
			if (isEmptyObj(tweeta.replyTo)) {
				tweeta.replyTo = undefined;
			}

			if (isEmptyObj(tweeta.retweetData)) {
				tweeta.retweetData = undefined;
			}
		});

		return res.status(OK).json({ users, tweets });
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

export { searchTweeter };
