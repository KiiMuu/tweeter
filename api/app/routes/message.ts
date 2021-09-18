import { Router } from 'express';

const router: Router = Router();

import { createMessage } from '../controllers/message';
import { isAuth } from '../middlewares/isAuth';

router.post('/message', isAuth, createMessage);

export default router;
