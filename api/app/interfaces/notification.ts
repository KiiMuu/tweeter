import { Document, Model } from 'mongoose';

export interface INotification extends Document {
	to: string | object;
	from: string | object;
	type: any;
	isOpened: boolean;
	entityId: string;
}

export interface INotificationModel extends Model<INotification> {
	// decalre statics here
	insertNotification(
		to: string | object,
		from: string | object,
		type: any,
		entityId: string
	): INotification;
}
