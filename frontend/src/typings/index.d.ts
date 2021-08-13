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
		profilePic?: string;
		coverPhoto?: string;
		name?: string;
		bio?: string;
		location?: string;
		website?: string;
		birthdate?: Date;
	}
}

export {
	TweetaType,
	TweetaProps,
	TweetsProps,
	CreateTweetaProps,
	UserInfoProps,
};
