
import http from 'k6/http';
import { check, sleep } from 'k6';

// ==========================================
// CONFIGURATION
// ==========================================

const BASE_URL = __ENV.BASE_URL || 'http://backend:9998';

export const options = {
  vus: 5,
  duration: '30s',

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: [
      'p(95)<1000',
      'p(99)<2000',
    ],
    checks: ['rate>0.95'],
  },

  tags: {
    application: 'spacedock',
    environment: 'development',
  },
};

// ==========================================
// SMOKE TEST
// ==========================================

export default function () {
  const response = http.get(`${BASE_URL}/health`, {
    tags: {
      endpoint: 'health',
      service: 'backend',
    },
    timeout: '10s',
  });

  check(response, {
    'HTTP status is 200': (r) => r.status === 200,
    'Response is not empty': (r) => r.body && r.body.length > 0,
    'Response time below 1 second': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
