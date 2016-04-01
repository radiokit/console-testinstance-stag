import ENV from './env';
import { Socket } from 'phoenix-socket';

// FIXME merge with official JS API
const Plumber
  = window.plumberStream // legacy
  = new Socket(
  ENV.apps.plumber.baseUrl.replace(/^http/, "ws") + "/api/stream/v1.0",
  {
    heartbeatIntervalMs: 1000
  }
);

Plumber.connect();

export default Plumber;
