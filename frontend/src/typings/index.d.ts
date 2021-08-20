declare module 'myTypes' {
	type TweetaType = {
		content: string;
		images: object[];
		postedBy: object;
		likes: string[];
		retweetData: object[];
		retweeters: object[];
		createdAt: string;
		updatedAt: string;
		_id: string;
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

	interface UserInfoProps {
		_id?: string;
		profilePic?: string;
		coverPhoto?: string;
		name?: string;
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
};
