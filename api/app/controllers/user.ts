import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
// import { IUser } from '../interfaces/user';
import generateToken from '../helpers/generateToken';
import { BAD_REQUEST, CREATED, OK, SERVER_ERROR } from '../constants';

const signUp = async (req: Request, res: Response): Promise<object | string> => {
    try {
        const { 
            name, username, email, password,
        } = req.body;

        const isUserExists = await User.findOne({ $or: [{email}, {username}] });

        if (isUserExists) {
            return res.status(BAD_REQUEST).json({
                message: 'That user already in use, try another one.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await new User({
            name, username, email, password: hashedPassword,
        }).save();

        return res.status(CREATED).json({ token: generateToken(createdUser._id) });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: error.message,
        });
    }
}

const signIn = async (req: Request, res: Response): Promise<object | string> => {
    try {
        const { 
            email, password,
        } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(BAD_REQUEST).json({
                message: `That user has no record in ${process.env.APP_NAME} or may be deleted.`,
            });
        }
        
        const isMatch = await bcrypt.compare(password, user?.password);
        
        if (isMatch) {
            return res.status(OK).json({ token: generateToken(user._id) });
        } else {
            return res.status(BAD_REQUEST).json({
                message: 'Invalid user password',
            });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: error.message,
        });
    }
}

const getCurrentUser = async (req: Request, res: Response): Promise<object | string> => {
    try {
        const user = await User.findOne({ email: req.user?.email }).select('-password');

        return res.json({
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: error.message,
        });
    }
}

export {
    signUp,
    signIn,
    getCurrentUser,
}