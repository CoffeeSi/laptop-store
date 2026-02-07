import { Router } from 'express';
import { registerUser, loginUser, logoutUser, authStatus } from '../controller/auth-controller.js';
import { requireAuth } from '../utils/auth-utils.js';

const auth_router = Router();

auth_router.post('/register', registerUser);
auth_router.post('/login', loginUser);
auth_router.post('/logout', requireAuth, logoutUser);
auth_router.get('/status', authStatus);

export default auth_router;