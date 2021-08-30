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
							_id: '$_id',
							users: { $addToSet: '$users' },
							tweets: {
								$addToSet: '$tweets',
							},
						},
					},
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
