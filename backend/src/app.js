import express from 'express';
import sessionMiddleware from './middleware/session.js';
import review_router from './routes/review-routes.js';
import auth_router from './routes/auth-router.js';

const app = express()

app.use(express.json());
app.use(sessionMiddleware());

app.use('/', review_router)
app.use('/api/auth', auth_router);

export default app;