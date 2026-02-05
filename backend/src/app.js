import express from 'express';
import sessionMiddleware from './middleware/session.js';
// import review_router from './routes/review-routes.js';
import auth_router from './routes/auth-router.js';
import laptop_router from './routes/laptop-router.js';
import order_router from './routes/order-router.js';

const app = express()
app.use(express.json());
app.use(sessionMiddleware());

//app.use('/', review_router)

app.use('/api/auth', auth_router);
app.use('/api/laptops', laptop_router);
app.use('/api/orders', order_router);

export default app;