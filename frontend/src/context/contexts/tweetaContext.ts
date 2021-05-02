import { createContext } from 'react';
import { ICreateTweeta } from '../types/tweeta';

type tweetaContextType = {
    // * get tweets
    tweetsLoading?: boolean;
    tweetsError?: string | null;

    // * create tweet
    tweetaCreateLoading?: boolean;
    tweetaCreateError?: string | null;
    tweetaCreateSuccess?: boolean;
    tweetaCreated?: any,

    // * get single tweet
    getSingleTweetaLoading?: boolean;
    getSingleTweetaError?: string | null;
    singleTweeta?: any,

    // * remove tweeta
    removeTweetaLoading?: boolean;
    removeTweetaError?: string | null;
    removeTweetaSuccess?: boolean,
    removedTweeta?: object,

    // * add tweeta img
    addTweetaImgLoading?: boolean;
    addTweetaImgError?: string | null;
    addTweetaImgSuccess?: boolean,
    images?: any,

    // * remove tweeta img
    removeTweetaImgLoading?: boolean;
    removeTweetaImgError?: string | null;
    removeTweetaImgSuccess?: boolean,
    createTweeta: (tweeta: ICreateTweeta) => any;
    addTweetaImgs: (images: object) => any,
    removeTweetaImgs: (public_id: string) => any,
    getTweets: () => any,
}

const tweetaContextDefaultValues: tweetaContextType = {
    // * get tweets
    tweetsLoading: false,
    tweetsError: null,

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
    createTweeta: () => {},
    addTweetaImgs: () => {},
    removeTweetaImgs: () => {},
    getTweets: () => [],
};

const TweetaContext = createContext<tweetaContextType>(tweetaContextDefaultValues);

export default TweetaContext;