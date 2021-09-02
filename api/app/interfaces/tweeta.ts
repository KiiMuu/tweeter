import { Document } from 'mongoose';
import { IUserInfo } from './user';

export interface IReply {
	_id: string;
	postedBy: string;
}

export interface ITweetaImages {
	url: string;
	public_id: string;
}

export interface IMedia {
	images: ITweetaImages[];
	content: string;
	postedBy: {
		name: string;
		username: string;
		email: string;
	};
}

export interface ITweeta extends Document {
	_id: string;
	content: string;
	images: ITweetaImages[];
	postedBy: IUserInfo;
	isPinned: boolean;
	likes: object[];
	retweeters: object[];
	retweetData: ITweeta | undefined;
	replyTo: ITweeta | undefined;
}
