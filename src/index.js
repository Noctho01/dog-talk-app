import envConfig from "./envConfig.js";
import { Log as log } from "./jobs/log.js";
import { application } from "./application/application.js";
import wssinit from './websocket/wsserver.js';

import { createServer } from 'http';
import { WebSocketServer } from "ws";

export const server = createServer(application);

const PORT = envConfig.PORT || 3000;

wssinit(WebSocketServer, server);
server.listen(PORT, () => log.debug('index.js is a main diretori', 10, `Server listening in port ${PORT}`));