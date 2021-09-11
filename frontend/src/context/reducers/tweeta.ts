import { Action } from '../actions/tweeta';
import {
	CreateTweetaType,
	GetTweetsType,
	GetSingleTweetaType,
	AddTweetaImgType,
	RemoveTweetaImgType,
	RemoveTweetaType,
	LikeTweetaType,
	RetweetTweetaType,
	WhatsHappeningType,
} from '../types/tweeta';
import { TweetaProps, UserInfoProps } from '../../typings';

interface TweetaState {
	// * get tweets
	tweetsLoading?: boolean;
	tweetsError?: string | null;
	tweets: TweetaProps[];

	// * create tweet
	tweetaCreateLoading?: boolean;
	tweetaCreateError?: string | null;
	tweetaCreateSuccess?: boolean;

	// * get single tweet
	getSingleTweetaLoading?: boolean;
	getSingleTweetaError?: string | null;
	singleTweeta: TweetaProps;

	// * remove tweeta
	removeTweetaLoading?: boolean;
	removeTweetaError?: string | null;
	removeTweetaSuccess?: boolean;
	removedTweeta?: TweetaProps;

	// * add tweeta img
	addTweetaImgLoading?: boolean;
	addTweetaImgError?: string | null;
	addTweetaImgSuccess?: boolean;
	images: object;

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
		joinedADayBefore: UserInfoProps[];
		topLiked: TweetaProps[];
	};
}

export const initialTweetaState: TweetaState = {
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
};

export const tweetaReducer = (
	state = initialTweetaState,
	action: Action
): TweetaState => {
	switch (action.type) {
		// * get tweets
		case GetTweetsType.TWEETS_LIST_REQUEST:
			return {
				...state,
				tweetsLoading: true,
			};
		case GetTweetsType.TWEETS_LIST_SUCCESS:
			return {
				...state,
				tweetsLoading: false,
				tweets: action.payload,
			};
		case GetTweetsType.TWEETS_LIST_FAIL:
			return {
				...state,
				tweetsLoading: false,
				tweetsError: action.payload,
				tweets: [],
			};

		// * create tweet
		case CreateTweetaType.TWEETA_CREATE_REQUEST:
			return {
				...state,
				tweetaCreateLoading: true,
			};
		case CreateTweetaType.TWEETA_CREATE_SUCCESS:
			return {
				...state,
				tweetaCreateLoading: false,
				tweetaCreateSuccess: true,
				tweets: [action.payload, ...state.tweets],
			};
		case CreateTweetaType.TWEETA_CREATE_FAIL:
			return {
				...state,
				tweetaCreateLoading: false,
				tweetaCreateError: action.payload,
			};

		// * get single tweeta
		case GetSingleTweetaType.GET_SINGLE_TWEETA_REQUEST:
			return {
				...state,
				getSingleTweetaLoading: true,
			};
		case GetSingleTweetaType.GET_SINGLE_TWEETA_SUCCESS:
			return {
				...state,
				getSingleTweetaLoading: false,
				singleTweeta: action.payload,
			};
		case GetSingleTweetaType.GET_SINGLE_TWEETA_FAIL:
			return {
				...state,
				getSingleTweetaLoading: false,
				getSingleTweetaError: action.payload,
			};

		// * remove tweeta
		case RemoveTweetaType.TWEETA_REMOVE_REQUEST:
			return {
				...state,
				removeTweetaLoading: true,
			};
		case RemoveTweetaType.TWEETA_REMOVE_SUCCESS:
			return {
				...state,
				removeTweetaLoading: false,
				removeTweetaSuccess: true,
				removedTweeta: action.payload,
				tweets: state.tweets.filter(
					(tweeta: TweetaProps) => tweeta._id !== action.payload._id
				),
			};
		case RemoveTweetaType.TWEETA_REMOVE_FAIL:
			return {
				...state,
				removeTweetaLoading: false,
				removeTweetaError: action.payload,
			};

		// * add tweeta img
		case AddTweetaImgType.TWEETA_IMG_ADD_REQUEST:
			return {
				...state,
				addTweetaImgLoading: true,
			};
		case AddTweetaImgType.TWEETA_IMG_ADD_SUCCESS:
			return {
				...state,
				addTweetaImgLoading: false,
				addTweetaImgSuccess: true,
				images: action.payload,
			};
		case AddTweetaImgType.TWEETA_IMG_ADD_FAIL:
			return {
				...state,
				addTweetaImgLoading: false,
				addTweetaImgError: action.payload,
			};

		// * remove tweeta img
		case RemoveTweetaImgType.TWEETA_IMG_REMOVE_REQUEST:
			return {
				...state,
				removeTweetaImgLoading: true,
			};
		case RemoveTweetaImgType.TWEETA_IMG_REMOVE_SUCCESS:
			return {
				...state,
				removeTweetaImgLoading: false,
				removeTweetaImgError: null,
				removeTweetaImgSuccess: true,
			};
		case RemoveTweetaImgType.TWEETA_IMG_REMOVE_FAIL:
			return {
				...state,
				removeTweetaImgLoading: false,
				removeTweetaImgError: action.payload,
			};

		// * like tweeta
		case LikeTweetaType.LIKE_TWEETA_REQUEST:
			return {
				...state,
				likeTweetaLoading: true,
			};
		case LikeTweetaType.LIKE_TWEETA_SUCCESS:
			return {
				...state,
				likeTweetaLoading: false,
				likeTweetaSuccess: true,
				tweets: state.tweets.map((tweeta: TweetaProps) =>
					tweeta._id === action.payload._id
						? { ...action.payload, likes: action.payload.likes }
						: tweeta
				),
			};
		case LikeTweetaType.LIKE_TWEETA_FAIL:
			return {
				...state,
				likeTweetaLoading: false,
				likeTweetaError: action.payload,
				likeTweetaSuccess: false,
			};

		// * retweet tweeta
		case RetweetTweetaType.RETWEET_TWEETA_REQUEST:
			return {
				...state,
				retweetTweetaLoading: true,
			};
		case RetweetTweetaType.RETWEET_TWEETA_SUCCESS:
			return {
				...state,
				retweetTweetaLoading: false,
				retweetTweetaSuccess: true,
				tweets: state.tweets.map((tweeta: TweetaProps) =>
					tweeta._id === action.payload._id
						? {
								...action.payload,
								retweeters: action.payload.retweeters,
						  }
						: tweeta
				),
			};
		case RetweetTweetaType.RETWEET_TWEETA_FAIL:
			return {
				...state,
				retweetTweetaLoading: false,
				retweetTweetaError: action.payload,
			};

		// * whats happening
		case WhatsHappeningType.WHATS_HAPPENING_REQUEST:
			return {
				...state,
				whatsHappeningLoading: true,
			};
		case WhatsHappeningType.WHATS_HAPPENING_SUCCESS:
			return {
				...state,
				whatsHappeningLoading: false,
				whatsHappeningData: {
					joinedADayBefore: action.payload.joinedADayBefore,
					topLiked: action.payload.topLiked,
				},
			};
		case WhatsHappeningType.WHATS_HAPPENING_FAIL:
			return {
				...state,
				whatsHappeningLoading: false,
				whatsHappeningError: action.payload,
			};
		default:
			return state;
	}
};
