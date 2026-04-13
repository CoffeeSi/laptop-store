import client from 'prom-client';
import { Router } from 'express';

const metrics_router = Router();

const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: 'node_' });

metrics_router.get('/', async (req, res) => {
    try {
        res.setHeader('Content-Type', register.contentType);
        res.send(await register.metrics());
    } catch (error) {
        res.status(500).send(error?.message || 'Failed to collect metrics');
    }
});

export default metrics_router;