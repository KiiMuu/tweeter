import { Router } from 'express';

const router: Router = Router();

import {
	createChat,
	getUserChats,
	getChat,
	updateChat,
	getChatMessages,
	markAsRead,
} from '../controllers/chat';
import { isAuth } from '../middlewares/isAuth';

router.post('/chat', isAuth, createChat);
router.get('/chats', isAuth, getUserChats);
router.get('/chats/:chatId', isAuth, getChat);
router.put('/chats/:chatId', isAuth, updateChat);
router.get('/chats/:chatId/messages', isAuth, getChatMessages);
router.put('/chats/:chatId/messages/markAsRead', isAuth, markAsRead);

export default router;
