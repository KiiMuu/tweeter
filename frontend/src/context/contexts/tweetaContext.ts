import { createContext } from 'react';
import { ICreateTweeta } from '../types/tweeta';

type tweetaContextType = {
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

    // * like tweeta
    likeTweetaLoading?: boolean,
    likeTweetaError?: string | null,
    likeTweetaSuccess?: boolean,

    createTweeta: (tweeta: ICreateTweeta) => any;
    addTweetaImgs: (images: object) => any,
    removeTweetaImgs: (public_id: string) => any,
    getTweets: () => any,
    tweetaLike: (id: string) => any,
    getSingleTweeta: (id: string) => any,
    deleteTweeta: (id: string) => any,
}

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

    createTweeta: () => {},
    addTweetaImgs: () => {},
    removeTweetaImgs: () => {},
    getTweets: () => [],
    tweetaLike: () => {},
    getSingleTweeta: () => {},
    deleteTweeta: () => {},
};

const TweetaContext = createContext<tweetaContextType>(tweetaContextDefaultValues);

export default TweetaContext;