import { model, Schema } from 'mongoose';
import { IMessage } from '../interfaces/message';

const { ObjectId } = Schema.Types;

const MessageSchema: Schema = new Schema(
	{
		sender: {
			type: ObjectId,
			ref: 'User',
		},
		content: {
			type: String,
			trim: true,
		},
		chat: {
			type: ObjectId,
			ref: 'Chat',
		},
		readBy: [
			{
				type: ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
);

const Message = model<IMessage>('Message', MessageSchema);

export default Message;
