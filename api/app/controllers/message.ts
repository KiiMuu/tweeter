import { Request, Response } from 'express';
import Message from '../models/Message';
import User from '../models/User';
import Notification from '../models/Notification';
import Chat from '../models/Chat';
import { IChat } from '../interfaces/chat';
import { IMessage } from '../interfaces/message';
import { BAD_REQUEST, OK } from '../constants';

const createMessage = async (req: Request, res: Response): Promise<object> => {
	try {
		const { content, chatId } = req.body;

		if (!content || !chatId) {
			return res.status(BAD_REQUEST).json({
				message: 'Please type a message',
			});
		}

		let message = new Message({
			content,
			chatId,
			sender: req.user?._id,
		});

		message = await message
			.populate('sender', 'name username profilePic')
			.execPopulate();
		message = await message.populate('chat').execPopulate();
		message = await User.populate(message, { path: 'chat.users' });

		const chat = await Chat.findByIdAndUpdate(chatId, {
			latestMessage: message,
		});

		insertNotifications(chat, message);

		return res.status(OK).json(message);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const insertNotifications = (chat: IChat, message: IMessage) => {
	chat.users.forEach((userId: any) => {
		if (userId === message.sender._id.toString()) return;

		Notification.insertNotification(
			userId,
			message.sender._id,
			'message',
			message.chat._id
		);
	});
};

export { createMessage };
