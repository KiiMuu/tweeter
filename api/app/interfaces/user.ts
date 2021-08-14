import { Document } from 'mongoose';

export interface IDataStoredInToken {
	id: string;
}

export interface IUserInfo extends Document {
	_id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	profilePic: string;
	coverPhoto: string;
	bio: string;
	location: string;
	website: string;
	birthdate: string;
	likes: string[];
	followers: string[];
	following: string[];
}
