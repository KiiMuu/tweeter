import { IUserInfo } from './user';

export enum CreateTweetaType {
	TWEETA_CREATE_REQUEST = 'TWEETA_CREATE_REQUEST',
	TWEETA_CREATE_SUCCESS = 'TWEETA_CREATE_SUCCESS',
	TWEETA_CREATE_FAIL = 'TWEETA_CREATE_FAIL',
}

export enum GetTweetsType {
	TWEETS_LIST_REQUEST = 'TWEETS_LIST_REQUEST',
	TWEETS_LIST_SUCCESS = 'TWEETS_LIST_SUCCESS',
	TWEETS_LIST_FAIL = 'TWEETS_LIST_FAIL',
}

export enum GetSingleTweetaType {
	GET_SINGLE_TWEETA_REQUEST = 'GET_SINGLE_TWEETA_REQUEST',
	GET_SINGLE_TWEETA_SUCCESS = 'GET_SINGLE_TWEETA_SUCCESS',
	GET_SINGLE_TWEETA_FAIL = 'GET_SINGLE_TWEETA_FAIL',
}

export enum RemoveTweetaType {
	TWEETA_REMOVE_REQUEST = 'TWEETA_REMOVE_REQUEST',
	TWEETA_REMOVE_SUCCESS = 'TWEETA_REMOVE_SUCCESS',
	TWEETA_REMOVE_FAIL = 'TWEETA_REMOVE_FAIL',
}

export enum AddTweetaImgType {
	TWEETA_IMG_ADD_REQUEST = 'TWEETA_IMG_ADD_REQUEST',
	TWEETA_IMG_ADD_SUCCESS = 'TWEETA_IMG_ADD_SUCCESS',
	TWEETA_IMG_ADD_FAIL = 'TWEETA_IMG_ADD_FAIL',
}

export enum RemoveTweetaImgType {
	TWEETA_IMG_REMOVE_REQUEST = 'TWEETA_IMG_REMOVE_REQUEST',
	TWEETA_IMG_REMOVE_SUCCESS = 'TWEETA_IMG_REMOVE_SUCCESS',
	TWEETA_IMG_REMOVE_FAIL = 'TWEETA_IMG_REMOVE_FAIL',
}

export enum LikeTweetaType {
	LIKE_TWEETA_REQUEST = 'LIKE_TWEETA_REQUEST',
	LIKE_TWEETA_SUCCESS = 'LIKE_TWEETA_SUCCESS',
	LIKE_TWEETA_FAIL = 'LIKE_TWEETA_FAIL',
}

export enum RetweetTweetaType {
	RETWEET_TWEETA_REQUEST = 'RETWEET_TWEETA_REQUEST',
	RETWEET_TWEETA_SUCCESS = 'RETWEET_TWEETA_SUCCESS',
	RETWEET_TWEETA_FAIL = 'RETWEET_TWEETA_FAIL',
}

export enum WhatsHappeningType {
	WHATS_HAPPENING_REQUEST = 'WHATS_HAPPENING_REQUEST',
	WHATS_HAPPENING_SUCCESS = 'WHATS_HAPPENING_SUCCESS',
	WHATS_HAPPENING_FAIL = 'WHATS_HAPPENING_FAIL',
}

export interface ICreateTweeta {
	content?: string;
	images: object;
	replyTo?: string;
}

export interface ITweetaImg {
	public_id: string;
	url: string;
}

export interface ITweeta {
	_id: string;
	content: string;
	images: ITweetaImg[];
	postedBy: IUserInfo;
	isPinned: boolean;
	likes: object[];
	retweeters: object[];
	retweetData: ITweeta;
	replyTo: ITweeta;
}

export interface IMedia {
	images: ITweetaImg[];
	content: string;
	postedBy: {
		name: string;
		username: string;
		email: string;
	};
}
