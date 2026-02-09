import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const protect = (req, res, next) => {
    if (!req.cookies?.token && !req.headers.authorization) {
        return res.status(401).json({ message: "Enter in the system" });
    }
    next();
};


export const restrictTo = (...roles) => {
    return (req, res, next) => {
        const role = req.user?.role;
        
        if (!role || !roles.includes(role)) {
            return res.status(403).json({ 
                message: "Not enough rights" 
            });
        }
        next();
    };
};