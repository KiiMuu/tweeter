import { Document, Model } from 'mongoose';

export interface INotification extends Document {
	to: string | object;
	from: string | object;
	type: string;
	isOpened: boolean;
	entityId: string;
}

export interface INotificationModel extends Model<INotification> {
	// decalre statics here
	insertNotification(
		to: string | object,
		from: string | object,
		type: string,
		entityId: string
	): INotification;
}
