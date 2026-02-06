export const protect = (req, res, next) => {
    if (!req.session.isLoggedIn || !req.session.userID) {
        return res.status(401).json({ message: "Enter in the system" });
    }
    req.user = {
        id: req.session.userID,
        role: req.session.role
    }
    next();
};


export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.session.role)) {
            return res.status(403).json({ 
                message: "Not enough rights" 
            });
        }
        next();
    };
};