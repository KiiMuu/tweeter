import { Router } from 'express';

const router: Router = Router();

import { signUp, signIn, getCurrentUser } from '../controllers/user';
import { isAuth } from '../middlewares/isAuth';
import runValidation from '../validators';
import { validateSignUp, validateSignIn } from '../validators/auth';

router.post('/user/signup', validateSignUp, runValidation, signUp);
router.post('/user/signin', validateSignIn, runValidation, signIn);
router.get('/user/current', isAuth, getCurrentUser);

export default router;