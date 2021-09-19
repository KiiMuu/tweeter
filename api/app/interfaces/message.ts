import { Document } from 'mongoose';
import { IUserInfo } from './user';
import { IChat } from './chat';

export interface IMessage extends Document {
	sender: IUserInfo;
	content: string;
	chat: IChat;
	readBy: IUserInfo[];
}
