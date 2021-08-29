import { Router } from 'express';

const router: Router = Router();

import { searchTweeter } from '../controllers/search';
import { isAuth } from '../middlewares/isAuth';

router.post('/search', searchTweeter);

export default router;
