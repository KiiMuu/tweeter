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

		const chat = new Chat({ users, isGroupChat: true });

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

		if (req.query.unreadOnly && req.query.unreadOnly === 'true') {
			chats = chats.filter(
				(chat: IChat) =>
					chat.latestMessage &&
					!chat.latestMessage.readBy.includes(req.user?._id)
			);
		}

		chats = await User.populate(chats, { path: 'latestMessage.sender' });

		return res.status(OK).json(chats);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const getChat = async (req: Request, res: Response): Promise<object> => {
	const chatId: string = req.params.chatId;

	try {
		const chat = await Chat.findOne({
			_id: chatId,
			users: { $elemMatch: { $eq: req.user?._id } },
		})
			.populate('users', '-password')
			.exec();

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
		const chatMessages = await Message.find({ 'chat._id': chatId })
			.populate('sender')
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
			{ 'chat._id': chatId },
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
