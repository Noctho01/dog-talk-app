import { application } from "./application/application.js";
import { Log as log } from "./jobs/log.js";
import envConfig from "./envConfig.js";
import { createServer } from 'http';

export const server = createServer(application);

const PORT = envConfig.PORT || 3000;

server.listen(PORT, () => log.debug('index.js is a main diretori', 10, `Server listening in port ${PORT}`));