import express from 'express';
import sessionMiddleware from './middleware/session.js';
// import review_router from './routes/review-routes.js';
import auth_router from './routes/auth-router.js';
import brand_router from './routes/brand-router.js';
import laptop_router from './routes/laptop-router.js';
import order_router from './routes/order-router.js';
import review_router from './routes/review-router.js';
import user_router from './routes/user-router.js';
const app = express()
app.use(express.json());
app.use(sessionMiddleware());


app.use('/api/auth', auth_router);
app.use('/api', laptop_router)
app.use('/api', brand_router)
app.use('/api', order_router)
app.use('/api', review_router)
app.use('/api', user_router)
export default app;