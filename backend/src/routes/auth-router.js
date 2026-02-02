import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'ewgen' && password === 'bro') {
        req.session.isLoggedIn = true;
        req.session.user = email;
        
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
})