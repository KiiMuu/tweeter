import { Request, Response } from 'express';
import Notification from '../models/Notification';
import { BAD_REQUEST, OK } from '../constants';

const getNotifications = async (
	req: Request,
	res: Response
): Promise<object> => {
	try {
		const { searchTerm } = req.query;

		let searchObj = searchTerm
			? {
					type: {
						$ne: 'message',
						$regex: searchTerm,
						$options: 'i',
					},
					to: req.user?._id,
			  }
			: {
					to: req.user?._id,
					type: { $ne: 'message' },
			  };

		const notifications = await Notification.find({ ...searchObj })
			.populate('to', '-password')
			.populate('from', '-password')
			.sort({ createdAt: -1 })
			.exec();

		return res.status(OK).json(notifications);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const getLatestNotification = async (
	req: Request,
	res: Response
): Promise<object> => {
	try {
		const notification = await Notification.findOne({ to: req.user?._id })
			.populate('to', '-password')
			.populate('from', '-password')
			.sort({ createdAt: -1 })
			.exec();

		return res.status(OK).json(notification);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const markNotificationAsOpened = async (
	req: Request,
	res: Response
): Promise<object> => {
	const id: string = req.params.id;

	try {
		let notification = await Notification.findByIdAndUpdate(id, {
			isOpened: true,
		})
			.populate('to', '-password')
			.populate('from', '-password')
			.sort({ createdAt: -1 })
			.exec();

		return res.status(OK).json(notification);
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

const markAllNotificationAsOpened = async (
	req: Request,
	res: Response
): Promise<object> => {
	try {
		await Notification.updateMany(
			{ to: req.user?._id },
			{
				isOpened: true,
			}
		)
			.populate('to', '-password')
			.populate('from', '-password')
			.sort({ createdAt: -1 })
			.exec();

		return res.status(OK).json({ ok: 'ok' });
	} catch (error: any) {
		return res.status(BAD_REQUEST).json({
			message: error.message,
		});
	}
};

export {
	getNotifications,
	getLatestNotification,
	markNotificationAsOpened,
	markAllNotificationAsOpened,
};
