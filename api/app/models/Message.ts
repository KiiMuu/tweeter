import { model, Schema } from 'mongoose';

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

const Message = model('Message', MessageSchema);

export default Message;
