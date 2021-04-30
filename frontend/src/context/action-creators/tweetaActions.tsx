import React, { useReducer } from 'react';
import axios from 'axios';
import TweetaContext from '../contexts/tweetaContext';
import { tweetaReducer } from '../reducers/tweetaReducer';
import { 
    CreateTweetaType, 
    // GetSingleTweetaType, 
    // GetTweetsType, 
    // RemoveTweetaType, 
    AddTweetaImgType,
    RemoveTweetaImgType 
} from '../types/tweeta';
import { ICreateTweeta } from '../types/tweeta';
import useUserInfo from '../../hooks/useUserInfo';

const TweetaState = ({ children }: { children: React.ReactNode }) => {
    const initialState = {
        loading: false,
        error: null,
        tweetaCreatesuccess: false,
        tweetaRemovesuccess: false,
        tweetaImgAddsuccess: false,
        tweets: [],
        images: {},
        tweeta: {},
    }

    const [state, dispatch] = useReducer(tweetaReducer, initialState);
    const { userInfo } = useUserInfo();

    // * actions
    const createTweeta = async (tweeta: ICreateTweeta) => {
        try {
            dispatch({
                type: CreateTweetaType.TWEETA_CREATE_REQUEST,
            });

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`,
                }
            }

            const { data } = await axios.post('/tweeta/create', tweeta, config);

            dispatch({
                type: CreateTweetaType.TWEETA_CREATE_SUCCESS,
                payload: data,
            });

        } catch (error) {
            dispatch({
                type: CreateTweetaType.TWEETA_CREATE_FAIL,
                payload: error.response?.data.message ? error.response.data.message : error.message,
            });
        }
    }

    const addTweetaImgs = async (images: object) => {
        try {
            dispatch({
                type: AddTweetaImgType.TWEETA_IMG_ADD_REQUEST,
            });

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`,
                }
            }

            const { data } = await axios.post('/tweeta/addTweetaImgs', images, config);

            dispatch({
                type: AddTweetaImgType.TWEETA_IMG_ADD_SUCCESS,
                payload: data,
            });

        } catch (error) {
            dispatch({
                type: AddTweetaImgType.TWEETA_IMG_ADD_FAIL,
                payload: error.response?.data.message ? error.response.data.message : error.message,
            });
        }
    }

    const removeTweetaImgs = async (public_id: string) => {
        try {
            dispatch({
                type: RemoveTweetaImgType.TWEETA_IMG_REMOVE_REQUEST,
            });

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`,
                }
            }

            const { data } = await axios.post('/tweeta/removeTweetaImgs', public_id, config);

            dispatch({
                type: RemoveTweetaImgType.TWEETA_IMG_REMOVE_SUCCESS,
                payload: data,
            });

        } catch (error) {
            dispatch({
                type: RemoveTweetaImgType.TWEETA_IMG_REMOVE_FAIL,
                payload: error.response?.data.message ? error.response.data.message : error.message,
            });
        }
    }

    return (
        <TweetaContext.Provider value={{
            loading: state.loading!,
            error: state.error!,
            tweetaCreatesuccess: state.tweetaCreatesuccess!,
            tweetaRemovesuccess: state.tweetaRemovesuccess!,
            tweetaImgAddsuccess: state.tweetaImgAddsuccess!,
            tweets: state.tweets!,
            images: state.images!,
            tweeta: state.tweeta!,
            createTweeta,
            addTweetaImgs,
            removeTweetaImgs,
        }}>
            {children}
        </TweetaContext.Provider>
    )
}

export default TweetaState;