import { Router } from 'express';

const router: Router = Router();

import {
	getNotifications,
	getLatestNotification,
	markNotificationAsOpened,
	markAllNotificationAsOpened,
} from '../controllers/notification';
import { isAuth } from '../middlewares/isAuth';

router.post('/getNotifications', isAuth, getNotifications);
router.get('/getLatestNotification', isAuth, getLatestNotification);
router.put('/:id/markAsOpened', isAuth, markNotificationAsOpened);
router.put('/markAllAsOpened', isAuth, markAllNotificationAsOpened);

export default router;
