import client from 'prom-client';

// Create a Registry
const register = new client.Registry();

// Add default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// HTTP request duration histogram
export const httpRequestDurationMs = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in milliseconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [50, 100, 200, 500, 1000, 2000, 5000],
    registers: [register],
});

// HTTP request counter
export const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register],
});

// Active connections gauge
export const httpActiveConnections = new client.Gauge({
    name: 'http_active_connections',
    help: 'Number of active HTTP connections',
    registers: [register],
});

// Business metrics
export const activeUsersGauge = new client.Gauge({
    name: 'laptop_store_active_users',
    help: 'Number of currently active users (estimated by recent sessions)',
    registers: [register],
});

export const ordersTotal = new client.Counter({
    name: 'laptop_store_orders_total',
    help: 'Total number of orders placed',
    labelNames: ['status'],
    registers: [register],
});

export const cartOperationsTotal = new client.Counter({
    name: 'laptop_store_cart_operations_total',
    help: 'Total number of cart operations',
    labelNames: ['operation'],
    registers: [register],
});

// Middleware to track HTTP metrics
export function metricsMiddleware(req, res, next) {
    const start = Date.now();
    httpActiveConnections.inc();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const route = req.route?.path || req.path || 'unknown';
        const labels = {
            method: req.method,
            route,
            status_code: res.statusCode,
        };

        httpRequestDurationMs.observe(labels, duration);
        httpRequestsTotal.inc(labels);
        httpActiveConnections.dec();
    });

    next();
}

export { register };
