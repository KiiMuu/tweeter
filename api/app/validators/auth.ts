import { check } from 'express-validator';

const validateSignUp = [
	check('name')
		.not()
		.isEmpty()
		.withMessage('Name can not be blank.')
		.isLength({ min: 2 })
		.withMessage('Name must has at least 2 characters long.'),
	check('username')
		.not()
		.isEmpty()
		.withMessage('Username can not be blank.')
		.isLength({ min: 2 })
		.withMessage('Username must has at least 2 characters long.')
		.trim()
		.isLowercase()
		.withMessage('Username must contain small letters only.'),
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email can not be blank.')
		.isEmail()
		.withMessage('Invalid email format, try again.'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must has at least 6 characters long.'),
];

const validateSignIn = [
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email can not be blank.')
		.isEmail()
		.withMessage('Invalid email format, try again.'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must has at least 6 characters long.'),
];

export { validateSignUp, validateSignIn };
