import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwtMiddleware from './middleware/jwt.js';
import review_router from './routes/review-router.js';
import auth_router from './routes/auth-router.js';
import laptop_router from './routes/laptop-router.js';
import order_router from './routes/order-router.js';
import user_router from './routes/user-router.js';
import brand_router from './routes/brand-router.js';
import { config } from 'dotenv';
config()

const app = express()

app.set('trust proxy', 1)

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))
app.use(jwtMiddleware());

app.use('/api/auth', auth_router);
app.use('/api/laptops', laptop_router);
app.use('/api/orders', order_router);
app.use('/api/users', user_router);
app.use('/api/reviews',review_router)
app.use('/api/brands', brand_router)

export default app;