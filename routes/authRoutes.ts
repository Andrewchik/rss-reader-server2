import { Router } from 'express';
import { login, logOut, checkAuth } from '../controllers/authControllers';

const router = Router();

router.get('/check-auth', checkAuth);
router.post('/login', login);
router.post('/logout', logOut);

export default router;