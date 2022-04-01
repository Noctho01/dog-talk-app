import envConfig from "./envConfig.js";
import { createServer } from 'http';
import { Log as log } from "./jobs/log.js";
import { application } from "./application/application.js";

export const server = createServer(application);

const PORT = envConfig.PORT || 3000;

server.listen(PORT, () => log.debug('index.js is a main diretori', 10, `Server listening in port ${PORT}`));