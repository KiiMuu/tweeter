import { Request, Response } from 'express';
import Tweeta from '../models/Tweeta';
import { BAD_REQUEST, CREATED, OK } from '../constants';

const createTweeta = async (req: Request, res: Response): Promise<object> => {
    try {
        const {
            content,
            images,
        } = req.body;

        const newTweeta = await Tweeta.create({
            content,
            images,
            postedBy: req.user?._id,
        });

        return res.status(CREATED).json(newTweeta);
    } catch (error) {
        return res.status(BAD_REQUEST).json({
            message: error.message,
        });
    }
}

const getTweets = async (req: Request, res: Response): Promise<object> => {
    try {
        const tweets = await Tweeta
        .find({})
        .sort({ createdAt: -1 })
        .populate('postedBy', '_id profilePic name username email');

        return res.status(OK).json(tweets);
    } catch (error) {
        return res.status(BAD_REQUEST).json({
            message: error.message,
        });
    }
}

const getSingleTweeta = async (req: Request, res: Response): Promise<object> => {
    try {
        const tweetaId = req.params.id;

        const tweeta = await Tweeta
        .findOne({ _id: tweetaId })
        .populate('postedBy', '_id profilePic name username email');

        return res.status(OK).json(tweeta);
    } catch (error) {
        return res.status(BAD_REQUEST).json({
            message: error.message,
        });
    }
}

const removeTweeta = async (req: Request, res: Response): Promise<object> => {
    try {
        const tweetaId = req.params.id;
        
        const removedTweeta = await Tweeta.findByIdAndRemove(tweetaId);

        return res.status(OK).json(removedTweeta);
    } catch (error) {
        return res.status(BAD_REQUEST).json({
            message: error.message,
        });
    }
}

export {
    createTweeta,
    getTweets,
    getSingleTweeta,
    removeTweeta,
}