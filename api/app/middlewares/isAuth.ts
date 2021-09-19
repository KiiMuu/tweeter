import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { UNAUTHORIZED } from '../constants';
import { IDataStoredInToken } from '../interfaces/user';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			// decoded => { id: '123456', iat: 3213123, exp: 3213432 }
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET as string
			) as IDataStoredInToken;

			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error: any) {
			return res.status(UNAUTHORIZED).json({
				message: error.message,
			});
		}
	}

	if (!token) {
		return res.status(UNAUTHORIZED).json({
			message: 'Not authorized, no token',
		});
	}
};

export { isAuth };
