import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';

(async () => {
  await initMongoDB();
  setupServer();
})();
