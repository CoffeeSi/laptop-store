import session from "express-session";
import MongoStore from 'connect-mongo';

function sessionMiddleware() {
    return session({
        name: 'session-id',
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,

        store: MongoStore.create({
            uri: process.env.MONGO_URI,
            collection: 'sessions'
        }),

        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        }
    })
}

export default sessionMiddleware;