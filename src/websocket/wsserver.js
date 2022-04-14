import { quintalServer, salaServer, cozinhaServer, esquinaServer } from "./application/RoomServerProvisori.js";
import { parse } from "url";

export default server => {
    server.on('upgrade', (req, socket, head) => {
        const { pathname } = parse(req.url);
        
        if (quintalServer.roomName === pathname.substr(1)) {
            quintalServer.handleUpgrade(req, socket, head);

        } else if (salaServer.roomName === pathname.substr(1)) {
            salaServer.handleUpgrade(req, socket, head);

        } else if (cozinhaServer.roomName === pathname.substr(1)) {
            cozinhaServer.handleUpgrade(req, socket, head);

        } else if (esquinaServer.roomName === pathname.substr(1)) {
            esquinaServer.handleUpgrade(req, socket, head);
        }
    });
}