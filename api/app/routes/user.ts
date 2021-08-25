import { Router } from 'express';

const router: Router = Router();

import {
	signUp,
	signIn,
	getCurrentUser,
	getUser,
	editProfile,
	follow,
	getUserProfileData,
} from '../controllers/user';
import { isAuth } from '../middlewares/isAuth';
import runValidation from '../validators';
import { validateSignUp, validateSignIn } from '../validators/auth';

router.post('/user/signup', validateSignUp, runValidation, signUp);
router.post('/user/signin', validateSignIn, runValidation, signIn);
router.get('/user/current', isAuth, getCurrentUser);
router.get('/user/:username', isAuth, getUser);
router.put('/user/editProfile', isAuth, editProfile);
router.put('/user/:userId/follow', isAuth, follow);
router.get('/user/:userId/tabs', isAuth, getUserProfileData);

export default router;
