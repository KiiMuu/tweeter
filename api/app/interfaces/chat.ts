import { Document } from 'mongoose';
import { IUserInfo } from './user';
import { IMessage } from './message';

export interface IChat extends Document {
	chatName: string;
	isGroupChat: boolean;
	users: IUserInfo[];
	latestMessage: any;
}
