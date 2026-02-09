import { registerUserService, loginUserService } from '../services/auth-service.js';
import jwt from 'jsonwebtoken';

async function registerUser(req, res) {
    const { full_name, email, password, phone, address } = req.body;

    if (!full_name || !email || !password || !phone || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if (!/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!/(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/.test(phone)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }    

    try {
        await registerUserService({ full_name, email, password, phone, address });
    } catch (error) {
        return res.status(400).json({ message: 'Error registering user', error: error.message });
    }

    res.status(201).json({ message: 'User registered successfully' });
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await loginUserService({ email, password });
        

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userID: user._id.toString(), role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return res.status(200).json({ 
            message: 'Login successful',
            token,
            userID: user._id.toString(),
            role: user.role
        });
    } catch (error) {
        return res.status(500).json({message: 'Error during login'});
    }
}

async function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

async function authStatus(req, res) {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(200).json({ isLoggedIn: false });
        }        

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).json({ 
            isLoggedIn: true, 
            userID: decoded.userID, 
            role: decoded.role 
        });
    } catch (error) {
        console.error('Auth status error:', error);
        return res.status(200).json({ isLoggedIn: false });
    }
}

export { registerUser, loginUser, logoutUser, authStatus };