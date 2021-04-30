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
    loading?: boolean;
    error?: string | null;
    tweetaCreatesuccess?: boolean;
    tweetaRemovesuccess?: boolean;
    tweetaImgAddsuccess?: boolean;
    tweets?: string[];
    images?: object;
    tweeta?: object;
}

const initialTweetaState: TweetaState = {
    loading: false,
    error: null,
    tweetaCreatesuccess: false,
    tweetaRemovesuccess: false,
    tweetaImgAddsuccess: false,
    tweets: [],
    images: {},
    tweeta: {},
}

export const tweetaReducer = (
    state = initialTweetaState, 
    action: Action
): TweetaState => {
    switch(action.type) {
        case CreateTweetaType.TWEETA_CREATE_REQUEST:
        case GetTweetsType.TWEETS_LIST_REQUEST:
        case GetSingleTweetaType.GET_SINGLE_TWEETA_REQUEST:
        case RemoveTweetaType.TWEETA_REMOVE_REQUEST:
        case AddTweetaImgType.TWEETA_IMG_ADD_REQUEST:
        case RemoveTweetaImgType.TWEETA_IMG_REMOVE_REQUEST:
            return {
                loading: true,
            }
        case CreateTweetaType.TWEETA_CREATE_SUCCESS:
            return {
                loading: false,
                error: null,
                tweetaCreatesuccess: true,
                tweeta: action.payload,
            }
        case GetTweetsType.TWEETS_LIST_SUCCESS:
            return {
                loading: false,
                error: null,
                tweets: action.payload,
            }
        case GetSingleTweetaType.GET_SINGLE_TWEETA_SUCCESS:
            return {
                loading: false,
                error: null,
                tweeta: action.payload,
            }
        case RemoveTweetaType.TWEETA_REMOVE_SUCCESS:
            return {
                loading: false,
                error: null,
                tweetaRemovesuccess: true,
                tweeta: action.payload,
            }
        case AddTweetaImgType.TWEETA_IMG_ADD_SUCCESS:
            return {
                loading: false,
                error: null,
                tweetaImgAddsuccess: true,
                images: action.payload,
            }
        case RemoveTweetaImgType.TWEETA_IMG_REMOVE_SUCCESS:
            return {
                loading: false,
                error: null,
            }
        case CreateTweetaType.TWEETA_CREATE_FAIL:
        case GetTweetsType.TWEETS_LIST_FAIL:
        case GetSingleTweetaType.GET_SINGLE_TWEETA_FAIL:
        case RemoveTweetaType.TWEETA_REMOVE_FAIL:
        case AddTweetaImgType.TWEETA_IMG_ADD_FAIL:
        case RemoveTweetaImgType.TWEETA_IMG_REMOVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}