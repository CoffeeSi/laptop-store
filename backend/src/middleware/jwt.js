import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

function jwtMiddleware() {
    return (req, res, next) => {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                req.user = {
                    userID: decoded.userID,
                    role: decoded.role
                };
                req.session = {
                    isLoggedIn: true,
                    userID: decoded.userID,
                    role: decoded.role
                };
            } catch (error) {
                console.error('JWT verification error:', error.message);
            }
        }
        
        next();
    };
}

export default jwtMiddleware;
