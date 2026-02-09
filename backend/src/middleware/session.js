import session from "express-session";
import MongoStore from 'connect-mongo';
import { config } from "dotenv";
config()

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
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        }
    })
}

export default sessionMiddleware;