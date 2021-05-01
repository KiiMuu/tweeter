import { Action } from '../actions/tweetaActions';
import {
    CreateTweetaType,
    GetTweetsType,
    GetSingleTweetaType,
    AddTweetaImgType,
    RemoveTweetaImgType,
    RemoveTweetaType,
} from '../types/tweeta';

interface TweetaState {
    // * get tweets
    tweetsLoading?: boolean;
    tweetsError?: string | null;
    tweets?: object[];

    // * create tweet
    tweetaCreateLoading?: boolean;
    tweetaCreateError?: string | null;
    tweetaCreateSuccess?: boolean;
    tweetaCreated?: object,

    // * get single tweet
    getSingleTweetaLoading?: boolean;
    getSingleTweetaError?: string | null;
    singleTweeta?: object,

    // * remove tweeta
    removeTweetaLoading?: boolean;
    removeTweetaError?: string | null;
    removeTweetaSuccess?: boolean,
    removedTweeta?: object,

    // * add tweeta img
    addTweetaImgLoading?: boolean;
    addTweetaImgError?: string | null;
    addTweetaImgSuccess?: boolean,
    images?: object,

    // * remove tweeta img
    removeTweetaImgLoading?: boolean;
    removeTweetaImgError?: string | null;
    removeTweetaImgSuccess?: boolean,



    loading?: boolean;
    error?: string | null;
    tweetaRemovesuccess?: boolean;
    tweetaImgAddsuccess?: boolean;
    tweeta?: object;
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
    tweetaCreated: {},

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
            }
        case GetTweetsType.TWEETS_LIST_SUCCESS:
            return {
                tweetsLoading: false,
                error: null,
                tweets: action.payload,
            }
        case GetTweetsType.TWEETS_LIST_FAIL:
            return {
                tweetsLoading: false,
                tweetsError: action.payload,
            }

        
        // * create tweet
        case CreateTweetaType.TWEETA_CREATE_REQUEST:
            return {
                tweetaCreateLoading: true,
            }
        case CreateTweetaType.TWEETA_CREATE_SUCCESS:
            return {
                tweetaCreateLoading: false,
                tweetaCreateError: null,
                tweetaCreateSuccess: true,
                tweetaCreated: action.payload,
            }
        case CreateTweetaType.TWEETA_CREATE_FAIL:
            return {
                tweetaCreateLoading: false,
                tweetaCreateError: action.payload,
                tweetaCreateSuccess: false,
            }
        
        // * get single tweeta
        case GetSingleTweetaType.GET_SINGLE_TWEETA_REQUEST:
            return  {
                getSingleTweetaLoading: true,
            }
        case GetSingleTweetaType.GET_SINGLE_TWEETA_SUCCESS:
            return {
                getSingleTweetaLoading: false,
                getSingleTweetaError: null,
                singleTweeta: action.payload,
            }
        case GetSingleTweetaType.GET_SINGLE_TWEETA_FAIL:
            return {
                getSingleTweetaLoading: false,
                getSingleTweetaError: action.payload,
            }

        // * remove tweeta
        case RemoveTweetaType.TWEETA_REMOVE_REQUEST:
            return  {
                removeTweetaLoading: true,
            }
        case RemoveTweetaType.TWEETA_REMOVE_SUCCESS:
            return {
                removeTweetaLoading: false,
                removeTweetaError: null,
                removeTweetaSuccess: true,
                removedTweeta: action.payload,
            }
        case RemoveTweetaType.TWEETA_REMOVE_FAIL:
            return {
                removeTweetaLoading: false,
                removeTweetaError: action.payload,
            }

        // * add tweeta img
        case AddTweetaImgType.TWEETA_IMG_ADD_REQUEST:
            return {
                addTweetaImgLoading: true,
            }
        case AddTweetaImgType.TWEETA_IMG_ADD_SUCCESS:
            return {
                addTweetaImgLoading: false,
                addTweetaImgError: null,
                addTweetaImgSuccess: true,
                images: action.payload,
            }
        case AddTweetaImgType.TWEETA_IMG_ADD_FAIL:
            return {
                addTweetaImgLoading: false,
                addTweetaImgError: action.payload,
            }

        // * remove tweeta img
        case RemoveTweetaImgType.TWEETA_IMG_REMOVE_REQUEST:
            return {
                removeTweetaImgLoading: true,
            }
        case RemoveTweetaImgType.TWEETA_IMG_REMOVE_SUCCESS:
            return {
                removeTweetaImgLoading: false,
                removeTweetaImgError: null,
            }
        case RemoveTweetaImgType.TWEETA_IMG_REMOVE_FAIL:
            return {
                removeTweetaImgLoading: false,
                removeTweetaImgError: action.payload,
            }
        default:
            return state;
    }
}