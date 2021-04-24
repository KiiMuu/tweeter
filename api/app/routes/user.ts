import { Router } from 'express';

const router: Router = Router();

import { signUp, signIn } from '../controllers/user';
import runValidation from '../validators';
import { validateSignUp, validateSignIn } from '../validators/auth';

router.post('/user/signup', validateSignUp, runValidation, signUp);
router.post('/user/signin', validateSignIn, runValidation, signIn);

export default router;