import { createContext } from 'react';
import { ICreateTweeta, ITweeta } from '../types/tweeta';
import { IUserInfo } from '../types/user';

type tweetaContextType = {
	// * get tweets
	tweetsLoading?: boolean;
	tweetsError?: string | null;
	tweets: object[];

	// * create tweet
	tweetaCreateLoading?: boolean;
	tweetaCreateError?: string | null;
	tweetaCreateSuccess?: boolean;

	// * get single tweet
	getSingleTweetaLoading?: boolean;
	getSingleTweetaError?: string | null;
	singleTweeta?: any;

	// * remove tweeta
	removeTweetaLoading?: boolean;
	removeTweetaError?: string | null;
	removeTweetaSuccess?: boolean;
	removedTweeta?: object;

	// * add tweeta img
	addTweetaImgLoading?: boolean;
	addTweetaImgError?: string | null;
	addTweetaImgSuccess?: boolean;
	images?: any;

	// * remove tweeta img
	removeTweetaImgLoading?: boolean;
	removeTweetaImgError?: string | null;
	removeTweetaImgSuccess?: boolean;

	// * like tweeta
	likeTweetaLoading?: boolean;
	likeTweetaError?: string | null;
	likeTweetaSuccess?: boolean;

	// * retweet tweeta
	retweetTweetaLoading?: boolean;
	retweetTweetaError?: string | null;
	retweetTweetaSuccess?: boolean;

	// * whats happening
	whatsHappeningLoading: boolean;
	whatsHappeningError: string | null;
	whatsHappeningData: {
		joinedADayBefore: IUserInfo[];
		topLiked: ITweeta[];
	};

	createTweeta: (tweeta: ICreateTweeta) => any;
	addTweetaImgs: (images: object) => any;
	removeTweetaImgs: (public_id: string) => any;
	getTweets: () => any;
	tweetaLike: (id: string) => any;
	tweetaRetweet: (id: string) => any;
	getSingleTweeta: (id: string) => any;
	deleteTweeta: (id: string) => any;
	getWhatsHappening: () =>
		| {
				joinedADayBefore: IUserInfo[];
				topLiked: ITweeta[];
		  }
		| object;
};

const tweetaContextDefaultValues: tweetaContextType = {
	// * get tweets
	tweetsLoading: false,
	tweetsError: null,
	tweets: [],

	// * create tweet
	tweetaCreateLoading: false,
	tweetaCreateError: null,
	tweetaCreateSuccess: false,

	// * get single tweet
	getSingleTweetaLoading: false,
	getSingleTweetaError: null,
	singleTweeta: {},

	// * remove tweeta
	removeTweetaLoading: false,
	removeTweetaError: null,
	removeTweetaSuccess: false,
	removedTweeta: {},

	// * add tweeta img
	addTweetaImgLoading: false,
	addTweetaImgError: null,
	addTweetaImgSuccess: false,
	images: {},

	// * remove tweeta img
	removeTweetaImgLoading: false,
	removeTweetaImgError: null,

	// * like tweeta
	likeTweetaLoading: false,
	likeTweetaError: null,
	likeTweetaSuccess: false,

	// * retweet tweeta
	retweetTweetaLoading: false,
	retweetTweetaError: null,
	retweetTweetaSuccess: false,

	// * whats happening
	whatsHappeningLoading: false,
	whatsHappeningError: null,
	whatsHappeningData: {
		joinedADayBefore: [],
		topLiked: [],
	},

	createTweeta: () => {},
	addTweetaImgs: () => {},
	removeTweetaImgs: () => {},
	getTweets: () => [],
	tweetaLike: () => {},
	tweetaRetweet: () => {},
	getSingleTweeta: () => {},
	deleteTweeta: () => {},
	getWhatsHappening: () => {
		return { joinedADayBefore: [], topLiked: [] };
	},
};

const TweetaContext = createContext<tweetaContextType>(
	tweetaContextDefaultValues
);

export default TweetaContext;
