
import { initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

export const faro = initializeFaro({
  url: '/collect/faro',

  app: {
    name: 'spacedock-frontend',
    version: '3.0.0',
    environment: import.meta.env.MODE,
  },

  instrumentations: [
    new TracingInstrumentation(),
  ],
});
