import express from 'express';
import sessionMiddleware from './middleware/session.js';
import router from '../routes/review-routes.js';
import express from "express"
const app = express()
app.use(express.json())

app.use('/', router)


app.use(express.json());
app.use(sessionMiddleware());

app.use('/api/auth', require('./routes/auth-router'));

export default app;