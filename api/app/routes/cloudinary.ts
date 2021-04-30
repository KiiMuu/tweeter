import { Router } from 'express';

const router: Router = Router();

import { addTweetaImages, removeTweetaImages } from '../controllers/cloudinary';
import { isAuth } from '../middlewares/isAuth';

router.post('/tweeta/addTweetaImgs', isAuth, addTweetaImages);
router.post('/tweeta/removeTweetaImgs', isAuth, removeTweetaImages);

export default router;