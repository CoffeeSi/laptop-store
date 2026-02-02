import bcrypt from 'bcryptjs';

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

function comparePassword(hashedPassword, password) {
    return bcrypt.compare(password, hashedPassword);
}

function requireAuth(req, res, next) {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

export { hashPassword, comparePassword, requireAuth };