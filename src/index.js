import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { TEMP_UPLOAD_DIR } from './constants/index.js';
import { createFolderIfNotExists } from './utils/createFolderIfNotExists.js';

(async () => {
  await initMongoConnection();
  await createFolderIfNotExists(TEMP_UPLOAD_DIR);
  setupServer();
})();
