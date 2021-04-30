import { Router } from 'express';

const router: Router = Router();

import { 
    createTweeta, 
    getTweets, 
    getSingleTweeta,
    removeTweeta, 
} from '../controllers/tweeta';
import { isAuth } from '../middlewares/isAuth';

router.post('/tweeta/create', isAuth, createTweeta);
router.get('/tweeta/getTweets', isAuth, getTweets);
router.get('/tweeta/getSingleTweeta/:id', isAuth, getSingleTweeta);
router.delete('/tweeta/remove/:id', isAuth, removeTweeta);

export default router;