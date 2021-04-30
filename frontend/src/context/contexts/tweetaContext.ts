import { createContext } from 'react';
import { ICreateTweeta } from '../types/tweeta';

type tweetaContextType = {
    loading: boolean,
    error: string | null,
    tweetaCreatesuccess: boolean,
    tweetaRemovesuccess: boolean,
    tweetaImgAddsuccess: boolean,
    tweets: string[],
    images: any,
    tweeta: any,
    createTweeta: (tweeta: ICreateTweeta) => any;
    addTweetaImgs: (images: object) => any,
    removeTweetaImgs: (public_id: string) => any,
}

const tweetaContextDefaultValues: tweetaContextType = {
    loading: false,
    error: null,
    tweetaCreatesuccess: false,
    tweetaRemovesuccess: false,
    tweetaImgAddsuccess: false,
    tweets: [],
    images: {},
    tweeta: {},
    createTweeta: () => {},
    addTweetaImgs: () => {},
    removeTweetaImgs: () => {},
};

const TweetaContext = createContext<tweetaContextType>(tweetaContextDefaultValues);

export default TweetaContext;