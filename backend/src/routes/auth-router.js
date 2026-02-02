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

export default auth_router;