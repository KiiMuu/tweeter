import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { UNPROCESSABLE_ENTITY } from '../constants';

const runValidation = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(UNPROCESSABLE_ENTITY).json({
			message: errors.array()[0].msg,
		});
	}

	next();
};

export default runValidation;
