import express from 'express';
import sessionMiddleware from './middleware/session.js';

const app = express();

app.use(express.json());
app.use(sessionMiddleware());

app.use('/api/auth', require('./routes/auth-router'));

export default app;