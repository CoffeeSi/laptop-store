import { registerUserService, loginUserService } from '../services/auth-service.js';

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
    const { email, password } = req.body;

    const user = await loginUserService({ email, password });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.isLoggedIn = true;
    req.session.userID = user._id.toString();
    req.session.role = user.role;
    
    return res.status(200).json({ message: 'Login successful' });
}

async function logoutUser(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('session_id');
        res.status(200).json({ message: 'Logout successful' });
    })
}

async function authStatus(req, res) {
    if (req.session.isLoggedIn) {
        return res.status(200).json({ isLoggedIn: true, userID: req.session.userID });
    } else {
        return res.status(401).json({ isLoggedIn: false });
    }
}

export { registerUser, loginUser, logoutUser, authStatus };