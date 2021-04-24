import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { IUser } from '../interfaces/user';
import generateToken from '../helpers/generateToken';
import { BAD_REQUEST, CREATED, OK } from '../constants';

const signUp = async (req: Request, res: Response): Promise<{}> => {
    try {
        const { 
            name, username, email, password,
        } = req.body as Pick<IUser, 'name' | 'username' | 'email' | 'password'>;

        const isUserExists = await User.findOne({ $or: [{email}, {username}] });

        if (isUserExists) {
            return res.status(BAD_REQUEST).json({
                message: 'That user already in use, try another one.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser: IUser = await new User({
            name, username, email, password: hashedPassword,
        }).save();

        return res.status(CREATED).json({
            createdUser,
            token: generateToken(createdUser._id),
        });
    } catch (error) {
        return res.status(BAD_REQUEST).json({
            message: error.message,
        });
    }
}

const signIn = async (req: Request, res: Response): Promise<{}> => {
    try {
        const { 
            email, password,
        } = req.body as Pick<IUser, 'email' | 'password'>;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(BAD_REQUEST).json({
                message: `That user has no record in ${process.env.APP_NAME} or may be deleted.`,
            });
        }
        
        const isMatch = await bcrypt.compare(password, user?.password);
        
        if (isMatch) {
            return res.status(OK).json({
                user,
                token: generateToken(user._id),
            });
        } else {
            return res.status(BAD_REQUEST).json({
                message: 'Invalid user password',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(BAD_REQUEST).json({
            message: error.message,
        });
    }
}

export {
    signUp,
    signIn,
}