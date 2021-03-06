import {
	CreateTweetaType,
	RemoveTweetaImgType,
	GetTweetsType,
	GetSingleTweetaType,
	AddTweetaImgType,
	RemoveTweetaType,
	LikeTweetaType,
	RetweetTweetaType,
	WhatsHappeningType,
} from '../types/tweeta';
import { TweetaProps, UserInfoProps } from '../../typings';

interface CreateTweetaActionRequest {
	type: CreateTweetaType.TWEETA_CREATE_REQUEST;
}

interface CreateTweetaActionSuccess {
	type: CreateTweetaType.TWEETA_CREATE_SUCCESS;
	payload: object;
}

interface CreateTweetaActionFail {
	type: CreateTweetaType.TWEETA_CREATE_FAIL;
	payload: string;
}

interface TweetsListActionRequest {
	type: GetTweetsType.TWEETS_LIST_REQUEST;
}

interface TweetsListActionSuccess {
	type: GetTweetsType.TWEETS_LIST_SUCCESS;
	payload: object[];
}

interface TweetsListActionFail {
	type: GetTweetsType.TWEETS_LIST_FAIL;
	payload: string;
}

interface SingleTweetaActionRequest {
	type: GetSingleTweetaType.GET_SINGLE_TWEETA_REQUEST;
}

interface SingleTweetaActionSuccess {
	type: GetSingleTweetaType.GET_SINGLE_TWEETA_SUCCESS;
	payload: TweetaProps;
}

interface SingleTweetaActionFail {
	type: GetSingleTweetaType.GET_SINGLE_TWEETA_FAIL;
	payload: string;
}

interface TweetaImgAddActionRequest {
	type: AddTweetaImgType.TWEETA_IMG_ADD_REQUEST;
}

interface TweetaImgAddActionSuccess {
	type: AddTweetaImgType.TWEETA_IMG_ADD_SUCCESS;
	payload: object;
}

interface TweetaImgAddActionFail {
	type: AddTweetaImgType.TWEETA_IMG_ADD_FAIL;
	payload: string;
}

interface TweetaImgRemveActionRequest {
	type: RemoveTweetaImgType.TWEETA_IMG_REMOVE_REQUEST;
}

interface TweetaImgRemveActionSuccess {
	type: RemoveTweetaImgType.TWEETA_IMG_REMOVE_SUCCESS;
	payload: object;
}

interface TweetaImgRemveActionFail {
	type: RemoveTweetaImgType.TWEETA_IMG_REMOVE_FAIL;
	payload: string;
}

interface TweetaRemveActionRequest {
	type: RemoveTweetaType.TWEETA_REMOVE_REQUEST;
}

interface TweetaRemveActionSuccess {
	type: RemoveTweetaType.TWEETA_REMOVE_SUCCESS;
	payload: TweetaProps;
}

interface TweetaRemveActionFail {
	type: RemoveTweetaType.TWEETA_REMOVE_FAIL;
	payload: string;
}

interface TweetaLikeActionRequest {
	type: LikeTweetaType.LIKE_TWEETA_REQUEST;
}

interface TweetaLikeActionSuccess {
	type: LikeTweetaType.LIKE_TWEETA_SUCCESS;
	payload: TweetaProps;
}

interface TweetaLikeActionFail {
	type: LikeTweetaType.LIKE_TWEETA_FAIL;
	payload: string;
}

interface TweetaRetweetActionRequest {
	type: RetweetTweetaType.RETWEET_TWEETA_REQUEST;
}

interface TweetaRetweetActionSuccess {
	type: RetweetTweetaType.RETWEET_TWEETA_SUCCESS;
	payload: TweetaProps;
}

interface TweetaRetweetActionFail {
	type: RetweetTweetaType.RETWEET_TWEETA_FAIL;
	payload: string;
}

interface WhatsHappeningActionRequest {
	type: WhatsHappeningType.WHATS_HAPPENING_REQUEST;
}

interface WhatsHappeningActionSuccess {
	type: WhatsHappeningType.WHATS_HAPPENING_SUCCESS;
	payload: {
		joinedADayBefore: UserInfoProps[];
		topLiked: TweetaProps[];
	};
}

interface WhatsHappeningActionFail {
	type: WhatsHappeningType.WHATS_HAPPENING_FAIL;
	payload: string;
}

export type Action =
	| CreateTweetaActionRequest
	| CreateTweetaActionSuccess
	| CreateTweetaActionFail
	| TweetsListActionRequest
	| TweetsListActionSuccess
	| TweetsListActionFail
	| SingleTweetaActionRequest
	| SingleTweetaActionSuccess
	| SingleTweetaActionFail
	| TweetaImgRemveActionRequest
	| TweetaImgAddActionRequest
	| TweetaImgAddActionSuccess
	| TweetaImgAddActionFail
	| TweetaImgRemveActionSuccess
	| TweetaImgRemveActionFail
	| TweetaRemveActionRequest
	| TweetaRemveActionSuccess
	| TweetaRemveActionFail
	| TweetaLikeActionRequest
	| TweetaLikeActionSuccess
	| TweetaLikeActionFail
	| TweetaRetweetActionRequest
	| TweetaRetweetActionSuccess
	| TweetaRetweetActionFail
	| WhatsHappeningActionRequest
	| WhatsHappeningActionSuccess
	| WhatsHappeningActionFail;
