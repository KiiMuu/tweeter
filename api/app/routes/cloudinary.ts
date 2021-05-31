import { Router } from 'express';

const router: Router = Router();

import { addTweetaImages, removeTweetaImages, handleProfilePic } from '../controllers/cloudinary';
import { isAuth } from '../middlewares/isAuth';

router.post('/tweeta/addTweetaImgs', isAuth, addTweetaImages);
router.post('/tweeta/removeTweetaImgs', isAuth, removeTweetaImages);
router.post('/user/profilePic', isAuth, handleProfilePic);

export default router;