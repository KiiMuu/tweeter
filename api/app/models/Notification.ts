import { model, Schema } from 'mongoose';
import { INotification, INotificationModel } from '../interfaces/notification';

const { ObjectId } = Schema.Types;

const NotificationSchema: Schema = new Schema(
	{
		to: {
			type: ObjectId,
			ref: 'User',
		},
		from: {
			type: ObjectId,
			ref: 'User',
		},
		type: String,
		isOpened: {
			type: Boolean,
			default: false,
		},
		entityId: ObjectId,
	},
	{ timestamps: true }
);

// Statics are pretty much the same as `methods` but allow for defining functions that exist directly on your Model -> deleteOne, create.
NotificationSchema.statics.insertNotification = async (
	to,
	from,
	type,
	entityId
) => {
	let data = {
		to,
		from,
		type,
		entityId,
	};

	await Notification.deleteOne(data).catch((error: any) =>
		console.log(error)
	);

	return Notification.create(data).catch((error: any) => console.log(error));
};

const Notification: INotificationModel = model<
	INotification,
	INotificationModel
>('Notification', NotificationSchema);

export default Notification;
