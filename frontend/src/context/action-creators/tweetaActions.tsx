import React, { useReducer } from 'react';
import axios from 'axios';
import TweetaContext from '../contexts/tweetaContext';
import { tweetaReducer, initialTweetaState } from '../reducers/tweetaReducer';
import {
	CreateTweetaType,
	GetSingleTweetaType,
	RemoveTweetaType,
	AddTweetaImgType,
	RemoveTweetaImgType,
	GetTweetsType,
	LikeTweetaType,
	RetweetTweetaType,
} from '../types/tweeta';
import { ICreateTweeta } from '../types/tweeta';
import useUserInfo from '../../hooks/useUserInfo';

const TweetaState = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(tweetaReducer, initialTweetaState);
	const { currentUser } = useUserInfo();

	// * actions
	const createTweeta = async (tweeta: ICreateTweeta) => {
		try {
			dispatch({
				type: CreateTweetaType.TWEETA_CREATE_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post('/tweeta/create', tweeta, config);

			dispatch({
				type: CreateTweetaType.TWEETA_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: CreateTweetaType.TWEETA_CREATE_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const addTweetaImgs = async (images: object) => {
		try {
			dispatch({
				type: AddTweetaImgType.TWEETA_IMG_ADD_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(
				'/tweeta/addTweetaImgs',
				images,
				config
			);

			dispatch({
				type: AddTweetaImgType.TWEETA_IMG_ADD_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: AddTweetaImgType.TWEETA_IMG_ADD_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const removeTweetaImgs = async (public_id: string) => {
		try {
			dispatch({
				type: RemoveTweetaImgType.TWEETA_IMG_REMOVE_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(
				'/tweeta/removeTweetaImgs',
				public_id,
				config
			);

			dispatch({
				type: RemoveTweetaImgType.TWEETA_IMG_REMOVE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: RemoveTweetaImgType.TWEETA_IMG_REMOVE_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const getTweets = async () => {
		try {
			dispatch({
				type: GetTweetsType.TWEETS_LIST_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.get('/tweeta/getTweets', config);

			dispatch({
				type: GetTweetsType.TWEETS_LIST_SUCCESS,
				payload: data,
			});

			return data;
		} catch (error) {
			dispatch({
				type: GetTweetsType.TWEETS_LIST_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const tweetaLike = async (id: string) => {
		try {
			dispatch({
				type: LikeTweetaType.LIKE_TWEETA_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.put(`/tweeta/${id}/like`, {}, config);

			dispatch({
				type: LikeTweetaType.LIKE_TWEETA_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: LikeTweetaType.LIKE_TWEETA_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const getSingleTweeta = async (id: string) => {
		try {
			dispatch({
				type: GetSingleTweetaType.GET_SINGLE_TWEETA_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.get(
				`/tweeta/getSingleTweeta/${id}`,
				config
			);

			dispatch({
				type: GetSingleTweetaType.GET_SINGLE_TWEETA_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: GetSingleTweetaType.GET_SINGLE_TWEETA_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const deleteTweeta = async (id: string) => {
		try {
			dispatch({
				type: RemoveTweetaType.TWEETA_REMOVE_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.delete(`/tweeta/remove/${id}`, config);

			dispatch({
				type: RemoveTweetaType.TWEETA_REMOVE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: RemoveTweetaType.TWEETA_REMOVE_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const tweetaRetweet = async (id: string) => {
		try {
			dispatch({
				type: RetweetTweetaType.RETWEET_TWEETA_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(
				`/tweeta/${id}/retweet`,
				{},
				config
			);

			dispatch({
				type: RetweetTweetaType.RETWEET_TWEETA_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: RetweetTweetaType.RETWEET_TWEETA_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	return (
		<TweetaContext.Provider
			value={{
				// * get tweets
				tweetsLoading: state.tweetsLoading,
				tweetsError: state.tweetsError,
				tweets: state.tweets,

				// * create tweet
				tweetaCreateLoading: state.tweetaCreateLoading,
				tweetaCreateError: state.tweetaCreateError,
				tweetaCreateSuccess: state.tweetaCreateSuccess,

				// * get single tweet
				getSingleTweetaLoading: state.getSingleTweetaLoading,
				getSingleTweetaError: state.getSingleTweetaError,
				singleTweeta: state.singleTweeta,

				// * remove tweeta
				removeTweetaLoading: state.removeTweetaLoading,
				removeTweetaError: state.removeTweetaError,
				removeTweetaSuccess: state.removeTweetaSuccess,
				removedTweeta: state.removedTweeta,

				// * add tweeta img
				addTweetaImgLoading: state.addTweetaImgLoading,
				addTweetaImgError: state.addTweetaImgError,
				addTweetaImgSuccess: state.addTweetaImgSuccess,
				images: state.images,

				// * remove tweeta img
				removeTweetaImgLoading: state.removeTweetaImgLoading,
				removeTweetaImgError: state.removeTweetaImgError,

				// * tweeta like
				likeTweetaLoading: state.likeTweetaLoading,
				likeTweetaError: state.likeTweetaError,
				likeTweetaSuccess: state.likeTweetaSuccess,

				// * tweeta retweet
				retweetTweetaLoading: state.likeTweetaLoading,
				retweetTweetaError: state.likeTweetaError,
				retweetTweetaSuccess: state.likeTweetaSuccess,

				createTweeta,
				addTweetaImgs,
				removeTweetaImgs,
				getTweets,
				tweetaLike,
				getSingleTweeta,
				deleteTweeta,
				tweetaRetweet,
			}}
		>
			{children}
		</TweetaContext.Provider>
	);
};

export default TweetaState;
