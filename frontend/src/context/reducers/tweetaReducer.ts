import { Action } from '../actions/tweetaActions';
import {
    CreateTweetaType,
    GetTweetsType,
    GetSingleTweetaType,
    AddTweetaImgType,
    RemoveTweetaImgType,
    RemoveTweetaType,
    LikeTweetaType,
} from '../types/tweeta';
import { TweetaProps } from '../../typings';

interface TweetaState {
    // * get tweets
    tweetsLoading?: boolean;
    tweetsError?: string | null;
    tweets: object[],

    // * create tweet
    tweetaCreateLoading?: boolean;
    tweetaCreateError?: string | null;
    tweetaCreateSuccess?: boolean;

    // * get single tweet
    getSingleTweetaLoading?: boolean;
    getSingleTweetaError?: string | null;
    singleTweeta: object,

    // * remove tweeta
    removeTweetaLoading?: boolean;
    removeTweetaError?: string | null;
    removeTweetaSuccess?: boolean,
    removedTweeta?: object,

    // * add tweeta img
    addTweetaImgLoading?: boolean;
    addTweetaImgError?: string | null;
    addTweetaImgSuccess?: boolean,
    images: object,

    // * remove tweeta img
    removeTweetaImgLoading?: boolean;
    removeTweetaImgError?: string | null;
    removeTweetaImgSuccess?: boolean,

    // * like tweeta
    likeTweetaLoading?: boolean;
    likeTweetaError?: string | null;
    likeTweetaSuccess?: boolean;
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
}

export const tweetaReducer = (
    state = initialTweetaState, 
    action: Action
): TweetaState => {
    switch(action.type) {
        // * get tweets
        case GetTweetsType.TWEETS_LIST_REQUEST:
            return {
                tweetsLoading: true,
                tweets: [],
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case GetTweetsType.TWEETS_LIST_SUCCESS:
            return {
                tweetsLoading: false,
                tweetsError: null,
                tweets: action.payload,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case GetTweetsType.TWEETS_LIST_FAIL:
            return {
                tweetsLoading: false,
                tweetsError: action.payload,
                tweets: [],
                images: state.images,
                singleTweeta: state.singleTweeta,
            }

        
        // * create tweet
        case CreateTweetaType.TWEETA_CREATE_REQUEST:
            return {
                tweetaCreateLoading: true,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case CreateTweetaType.TWEETA_CREATE_SUCCESS:
            return {
                tweetaCreateLoading: false,
                tweetaCreateError: null,
                tweetaCreateSuccess: true,
                tweets: [action.payload, ...state.tweets],
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case CreateTweetaType.TWEETA_CREATE_FAIL:
            return {
                tweetaCreateLoading: false,
                tweetaCreateError: action.payload,
                tweetaCreateSuccess: false,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        
        // * get single tweeta
        case GetSingleTweetaType.GET_SINGLE_TWEETA_REQUEST:
            return  {
                getSingleTweetaLoading: true,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case GetSingleTweetaType.GET_SINGLE_TWEETA_SUCCESS:
            return {
                getSingleTweetaLoading: false,
                getSingleTweetaError: null,
                singleTweeta: action.payload,
                images: state.images,
                tweets: state.tweets,
            }
        case GetSingleTweetaType.GET_SINGLE_TWEETA_FAIL:
            return {
                getSingleTweetaLoading: false,
                getSingleTweetaError: action.payload,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }

        // * remove tweeta
        case RemoveTweetaType.TWEETA_REMOVE_REQUEST:
            return  {
                removeTweetaLoading: true,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case RemoveTweetaType.TWEETA_REMOVE_SUCCESS:
            return {
                removeTweetaLoading: false,
                removeTweetaError: null,
                removeTweetaSuccess: true,
                removedTweeta: action.payload,
                tweets: state.tweets.filter((tweeta: TweetaProps) => tweeta._id !== action.payload._id),
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case RemoveTweetaType.TWEETA_REMOVE_FAIL:
            return {
                removeTweetaLoading: false,
                removeTweetaError: action.payload,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }

        // * add tweeta img
        case AddTweetaImgType.TWEETA_IMG_ADD_REQUEST:
            return {
                addTweetaImgLoading: true,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case AddTweetaImgType.TWEETA_IMG_ADD_SUCCESS:
            return {
                addTweetaImgLoading: false,
                addTweetaImgError: null,
                addTweetaImgSuccess: true,
                images: action.payload,
                tweets: state.tweets,
                singleTweeta: state.singleTweeta,
            }
        case AddTweetaImgType.TWEETA_IMG_ADD_FAIL:
            return {
                addTweetaImgLoading: false,
                addTweetaImgError: action.payload,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }

        // * remove tweeta img
        case RemoveTweetaImgType.TWEETA_IMG_REMOVE_REQUEST:
            return {
                removeTweetaImgLoading: true,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case RemoveTweetaImgType.TWEETA_IMG_REMOVE_SUCCESS:
            return {
                removeTweetaImgLoading: false,
                removeTweetaImgError: null,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case RemoveTweetaImgType.TWEETA_IMG_REMOVE_FAIL:
            return {
                removeTweetaImgLoading: false,
                removeTweetaImgError: action.payload,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        
        // * like tweeta
        case LikeTweetaType.LIKE_TWEETA_REQUEST:
            return {
                likeTweetaLoading: false,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        case LikeTweetaType.LIKE_TWEETA_SUCCESS:
            return {
                likeTweetaLoading: true,
                likeTweetaError: null,
                likeTweetaSuccess: true,
                tweets: state.tweets.map((tweeta: TweetaProps) => tweeta._id === action.payload._id ? { ...action.payload, likes: action.payload.likes } : tweeta),
                images: state.images,
                singleTweeta: { ...state.singleTweeta, likes: action.payload.likes },
            }
        case LikeTweetaType.LIKE_TWEETA_FAIL:
            return {
                likeTweetaLoading: false,
                likeTweetaError: action.payload,
                likeTweetaSuccess: false,
                tweets: state.tweets,
                images: state.images,
                singleTweeta: state.singleTweeta,
            }
        default:
            return state;
    }
}