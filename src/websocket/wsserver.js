import { quintalServer, salaServer, cozinhaServer, esquinaServer } from "./application/RoomServerProvisori.js";
import { parse } from "url";

export default server => {
    try {
        server.on('upgrade', (req, socket, head) => {
            const { pathname } = parse(req.url);
            
            if (quintalServer.roomName === pathname.substr(1)) {
                quintalServer.handleUpgrade(req, socket, head, ws => {
                    quintalServer.emit('connection', ws, req)
                });

            } else if (salaServer.roomName === pathname.substr(1)) {
                salaServer.handleUpgrade(req, socket, head, ws => {
                    salaServer.emit('connection', ws, req);
                });

            } else if (cozinhaServer.roomName === pathname.substr(1)) {
                cozinhaServer.handleUpgrade(req, socket, head, ws => {
                    cozinhaServer.emit('connection', ws, req);
                });

            } else if (esquinaServer.roomName === pathname.substr(1)) {
                esquinaServer.handleUpgrade(req, socket, head, ws => {
                    esquinaServer.emit('connection', ws, req);
                });
            }
        });

    } catch (err) {
        console.log('aqui')
        console.error(err);
    }
}