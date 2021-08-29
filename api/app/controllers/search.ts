import { Request, Response } from 'express';
import { BAD_REQUEST, OK, SERVER_ERROR } from '../constants';
import Tweeta from '../models/Tweeta';

interface Search {
	searchTerm: string;
}

const searchTweeter = async (req: Request, res: Response) => {
	try {
		const { searchTerm } = req.query as unknown as Search;

		if (searchTerm) {
			await Tweeta.aggregate(
				[
					{
						$lookup: {
							from: 'users',
							localField: 'postedBy',
							foreignField: '_id',
							as: 'users',
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
					// populate nested objects
					// -> postedBy, replyTo,
					{
						$lookup: {
							from: 'users',
							localField: 'tweets.postedBy',
							foreignField: '_id',
							as: 'postedBy',
						},
					},
					{
						$lookup: {
							from: 'users',
							localField: 'tweets.replyTo',
							foreignField: '_id',
							as: 'replyTo',
						},
					},
					{
						$addFields: {
							'tweets.postedBy': {
								$cond: [
									{ $ne: ['$postedBy', []] },
									{ $arrayElemAt: ['$postedBy', 0] },
									'$tweets.postedBy',
								],
							},
							'tweets.replyTo': {
								$cond: [
									{ $ne: ['$replyTo', []] },
									{ $arrayElemAt: ['$replyTo', 0] },
									'$tweets.replyTo',
								],
							},
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
					{ $unwind: '$tweets' },
					{ $unwind: '$users' },
					{
						$group: {
							_id: 0,
							users: { $addToSet: '$users' },
							tweets: { $addToSet: '$tweets' },
						},
					},
					// { $limit: limit },
					// { $skip: skip },
				],
				(error: { message: string }, data: any[]) => {
					if (error) {
						return res.status(BAD_REQUEST).json({
							message: error.message,
						});
					}

					return res.status(OK).json(data);
				}
			);
		}
	} catch (error) {
		return res.status(SERVER_ERROR).json({
			message: error.message,
		});
	}
};

export { searchTweeter };
