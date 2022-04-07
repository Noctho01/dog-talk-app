import { Room } from "./application/Room.js";
import { parse } from "url";

export default (WebSocketServer, server) => {
    const
    roomsListNames = ['quiantal', 'sala', 'cozinha', 'esquina'],
    wssRooms = roomsListNames.map(roomName => new Room(WebSocketServer, roomName));

    wssRooms.forEach(wss => {
        wss.onConnection();
    });

    server.on('upgrade', (req, socket, head) => {
        const { pathname } = parse(req.url);
        wssRooms.forEach(wss => {
            if (wss.roomName === pathname.substr(1)) {
                wss.handleUpgrade(req, socket, head);
            }
        })
    });
}