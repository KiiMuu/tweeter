import { model, Schema } from 'mongoose';
import { IChat } from '../interfaces/chat';

const { ObjectId } = Schema.Types;

const ChatSchema: Schema = new Schema(
	{
		chatName: {
			type: String,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: ObjectId,
				ref: 'User',
			},
		],
		latestMessage: {
			type: ObjectId,
			ref: 'Message',
		},
	},
	{ timestamps: true }
);

const Chat = model<IChat>('Chat', ChatSchema);

export default Chat;
