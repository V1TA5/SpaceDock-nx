
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {
  const response = http.get('http://backend:9998/health');

  check(response, {
    'HTTP status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
