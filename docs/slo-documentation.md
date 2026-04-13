# SLO Documentation – Laptop Store

## Overview

This document defines the **Service Level Indicators (SLIs)**, **Service Level Objectives (SLOs)**, and **Error Budget** calculations for the Laptop Store web application.

---

## SLI 1 – API Request Success Rate

### Definition

The percentage of HTTP requests to the backend API that return a non-5xx (server error) response.

```
SLI = (total_requests - 5xx_requests) / total_requests × 100
```

### PromQL (used in Grafana & Prometheus)

```promql
(1 - (
  sum(rate(http_requests_total{status_code=~"5.."}[30m]))
  /
  sum(rate(http_requests_total[30m]))
)) * 100
```

### SLO Target: **99.5%**

| Period     | Total Minutes | Allowed Downtime (0.5%) |
|------------|---------------|-------------------------|
| Per day    | 1 440 min     | 7.2 minutes             |
| Per week   | 10 080 min    | 50.4 minutes            |
| Per month  | 43 200 min    | **216 minutes (3.6 h)** |
| Per year   | 525 600 min   | 2 628 minutes (43.8 h)  |

### Monthly Error Budget Calculation (30-day period)

```
Monthly minutes         = 30 × 24 × 60 = 43 200 min
Error budget (0.5%)     = 43 200 × 0.005 = 216 minutes
Remaining budget        = 216 − (minutes where error rate > 0.5%)
```

**Example**: If the backend experienced 45 minutes of elevated 5xx errors in a month:

```
Budget consumed  = 45 / 216 × 100 ≈ 20.8 %
Budget remaining = 79.2 % (171 minutes)
```

---

## SLI 2 – Page Load Performance

### Definition

The percentage of frontend/API requests that complete in **under 2 seconds** (2 000 ms).

```
SLI = requests_completed_under_2000ms / total_requests × 100
```

### PromQL (used in Grafana & Prometheus)

```promql
(
  sum(rate(http_request_duration_ms_bucket{le="2000"}[30m]))
  /
  sum(rate(http_request_duration_ms_count[30m]))
) * 100
```

### SLO Target: **99%**

| Period     | Total Minutes | Allowed Slow-Requests (1%) |
|------------|---------------|----------------------------|
| Per day    | 1 440 min     | 14.4 minutes               |
| Per week   | 10 080 min    | 100.8 minutes              |
| Per month  | 43 200 min    | **432 minutes (7.2 h)**    |
| Per year   | 525 600 min   | 5 256 minutes (87.6 h)     |

### Monthly Error Budget Calculation (30-day period)

```
Monthly minutes          = 30 × 24 × 60 = 43 200 min
Error budget (1%)        = 43 200 × 0.01 = 432 minutes
Remaining budget         = 432 − (minutes where p95 latency > 2 000 ms)
```

**Example**: If the p95 latency exceeded 2 s for 30 minutes in a month:

```
Budget consumed  = 30 / 432 × 100 ≈ 6.9 %
Budget remaining = 93.1 % (402 minutes)
```

---

## Alert Thresholds

| Alert                    | Condition                        | Severity | Window |
|--------------------------|----------------------------------|----------|--------|
| APIHighErrorRateWarning   | 5xx error rate > 1%              | Warning  | 2 min  |
| APIHighErrorRateCritical  | 5xx error rate > 5%              | Critical | 1 min  |
| APIHighLatencyWarning     | p95 latency > 1 500 ms           | Warning  | 5 min  |
| APIHighLatencyCritical    | p95 latency > 2 000 ms           | Critical | 2 min  |

---

## Dashboard Panels

The Grafana dashboard (`monitoring/grafana/dashboards/laptop-store-dashboard.json`) includes:

### SLO Compliance
- SLI 1 – API Success Rate gauge (99.5% SLO)
- SLI 2 – Page Load Performance gauge (99% SLO)
- Error Budget Consumed % for both SLIs

### Golden Signals
| Signal     | Panels |
|------------|--------|
| **Latency**     | p50/p95/p99 API response times; p95 by route |
| **Traffic**     | Total requests/sec; requests/sec by route |
| **Errors**      | 5xx error rate with SLO thresholds; requests by status code |
| **Saturation**  | CPU, memory, disk (via Node Exporter); active connections; Node.js heap |

### Business Metrics
- Active users gauge
- Total orders counter
- Order rate per minute by status
- Cart operations per minute by operation type

---

## Error Budget Policy

| Budget Remaining | Action |
|-----------------|--------|
| > 50 %          | Normal operations, feature work continues |
| 25 – 50 %       | Review recent deployments, increase monitoring |
| 10 – 25 %       | Freeze non-critical deployments, focus on reliability |
| < 10 %          | Full incident response, no feature deployments |
| 0 % (exhausted) | SLO breached – escalate to on-call, post-mortem required |
