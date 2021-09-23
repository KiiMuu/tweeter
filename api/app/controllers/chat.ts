import { Request, Response } from 'express';
import Chat from '../models/Chat';
import User from '../models/User';
import Message from '../models/Message';
import { BAD_REQUEST, OK } from '../constants';
import { IChat } from '../interfaces/chat';

const createChat = async (req: Request, res: Response): Promise<object> => {
	try {
		const { users } = req.body;

		if (!users.length) {
			return res.status(BAD_REQUEST).json({
				message: 'The chat must has at least one user.',
			});
		}

		users.push(req.user);

		let chat = await Chat.create({ users, isGroupChat: true });

		return res.status(OK).json(chat);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const getUserChats = async (req: Request, res: Response): Promise<object> => {
	try {
		let chats = await Chat.find({
			users: {
				$elemMatch: {
					$eq: req.user?._id,
				},
			},
		})
			.populate(
				'users',
				'-password -likes -following -followers -retweets'
			)
			.populate('latestMessage')
			.sort({ createdAt: -1 })
			.exec();

		chats = await User.populate(chats, {
			path: 'latestMessage.sender',
			select: 'name username profilePic',
		});

		if (req.query.unreadOnly && req.query.unreadOnly === 'true') {
			chats = chats.filter(
				(chat: IChat) =>
					chat.latestMessage &&
					!chat.latestMessage.readBy.includes(req.user?._id)
			);
		}

		return res.status(OK).json(chats);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const getChat = async (req: Request, res: Response): Promise<object> => {
	const chatId: string = req.params.chatId;
	const userId: string = req.user?._id;

	try {
		let chat = await Chat.findOne({
			_id: chatId,
			users: { $elemMatch: { $eq: userId } },
		})
			.populate('users', '-password')
			.populate('latestMessage')
			.exec();

		// handle individual chats
		if (!chat) {
			// Check if chat id is really user id
			let otherUser = await User.findById(chatId);

			if (otherUser) {
				// get chat using user id
				chat = await Chat.findOneAndUpdate(
					{
						isGroupChat: false,
						users: {
							$size: 2,
							$all: [
								{ $elemMatch: { $eq: userId } },
								{ $elemMatch: { $eq: otherUser._id } },
							],
						},
					},
					{
						$setOnInsert: {
							users: [userId, otherUser._id],
						},
					},
					{
						new: true,
						upsert: true,
					}
				)
					.populate('users', '-password')
					.populate('latestMessage')
					.exec();
			}
		}

		chat = await User.populate(chat, {
			path: 'latestMessage.sender',
			select: 'name username profilePic',
		});

		return res.status(OK).json(chat);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const updateChat = async (req: Request, res: Response): Promise<object> => {
	const chatId: string = req.params.chatId;

	try {
		const chat = await Chat.findByIdAndUpdate(chatId, req.body).exec();

		return res.status(OK).json(chat);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const getChatMessages = async (
	req: Request,
	res: Response
): Promise<object> => {
	const chatId: string = req.params.chatId;

	try {
		const chatMessages = await Message.find({ chat: chatId })
			.populate('sender', 'name username profilePic')
			.populate('readBy', 'name username profilePic')
			.exec();

		return res.status(OK).json(chatMessages);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const markAsRead = async (req: Request, res: Response): Promise<object> => {
	const chatId: string = req.params.chatId;

	try {
		await Message.updateMany(
			{ chat: chatId },
			{ $addToSet: { readBy: req.user?._id } }
		).exec();

		return res.status(OK).json({ ok: 'Ok!' });
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

export {
	createChat,
	getUserChats,
	getChat,
	updateChat,
	getChatMessages,
	markAsRead,
};
