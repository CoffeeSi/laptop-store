<<<<<<< HEAD
import express from 'express';

const auth_router = express.Router();

auth_router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'ewgen' && password === 'bro') {
        req.session.isLoggedIn = true;
        req.session.user = email;
        
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
})
=======
import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth-controller.js';
import { requireAuth } from '../utils/auth-utils.js';

const auth_router = Router();

auth_router.post('/register', registerUser);
auth_router.post('/login', loginUser);
auth_router.post('/logout', requireAuth, logoutUser);
>>>>>>> 0efc8df41287402e7f1972b5d82ac0729e14cb6d

export default auth_router;