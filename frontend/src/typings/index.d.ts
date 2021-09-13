declare module 'myTypes' {
	type TweetaImg = {
		public_id: string;
		url: string;
	};

	type TweetaType = {
		content: string;
		images: TweetaImg[];
		postedBy: UserInfoProps;
		isPinned: boolean;
		likes: TweetaType[];
		retweeters: object[];
		retweetData: TweetaType;
		replyTo: TweetaType;
		createdAt: string;
		updatedAt: string;
		_id: string;
	};

	type TweetaMedia = {
		images: TweetaImg[];
		content: string;
		postedBy: {
			name: string;
			username: string;
			email: string;
		};
	};

	interface TweetaProps {
		tweeta: TweetaType;
	}

	interface TweetsProps {
		tweets: TweetaType[];
	}

	interface CreateTweetaProps {
		content?: string;
		images: object;
	}

	interface MediaProps {
		media: TweetaMedia;
	}

	interface UserInfoProps {
		_id?: string;
		profilePic?: string;
		coverPhoto?: string;
		name?: string;
		username?: string;
		bio?: string;
		location?: string;
		website?: string;
		birthdate?: Date;
		likes?: string[];
		following?: UserInfoProps[];
		followers?: UserInfoProps[];
	}

	interface FollowerUser {
		_id: string;
		profilePic: string;
		name: string;
		username: string;
		followers: UserInfoProps[];
		following: UserInfoProps[];
	}

	interface ICurrentUser {
		user?: UserInfoProps;
	}

	interface IUserProfile {
		user?: UserInfoProps;
	}

	interface INotification {
		_id?: string;
		to?: IUserInfo[];
		from?: IUserInfo[];
		type?: string;
		entityId: string;
	}
}

export {
	TweetaType,
	TweetaProps,
	TweetsProps,
	CreateTweetaProps,
	UserInfoProps,
	FollowerUser,
	ICurrentUser,
	UserInfoProps,
	IUserProfile,
	MediaProps,
	TweetaMedia,
	TweetaImg,
	INotification,
};
