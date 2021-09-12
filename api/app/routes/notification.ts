import { Router } from 'express';

const router: Router = Router();

import { test } from '../controllers/notification';
import { isAuth } from '../middlewares/isAuth';

router.post('/test', isAuth, test);

export default router;
