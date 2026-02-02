import dotenv from "dotenv";
dotenv.config();

import session from "express-session";
import MongoStore from 'connect-mongo';

function sessionMiddleware() {
    return session({
        name: 'session-id',
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'sessions'
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