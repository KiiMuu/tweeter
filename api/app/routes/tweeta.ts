import { Router } from 'express';

const router: Router = Router();

import {
	createTweeta,
	getTweets,
	getSingleTweeta,
	removeTweeta,
	tweetaLike,
	tweetaRetweet,
	// createReply,
	// removeReply,
} from '../controllers/tweeta';
import { isAuth } from '../middlewares/isAuth';

router.post('/tweeta/create', isAuth, createTweeta);
router.get('/tweeta/getTweets', isAuth, getTweets);
router.get('/tweeta/getSingleTweeta/:id', isAuth, getSingleTweeta);
router.delete('/tweeta/remove/:id', isAuth, removeTweeta);
router.put('/tweeta/:id/like', isAuth, tweetaLike);
router.post('/tweeta/:id/retweet', isAuth, tweetaRetweet);
// router.post('/tweeta/:id/createReply', isAuth, createReply);
// router.delete('/tweeta/:id/removeReply/:replyId', isAuth, removeReply);

export default router;
