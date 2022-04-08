import { RoomServer } from "./application/RoomServer.js";
import { parse } from "url";

export default server => {
    const
    roomsListNames = ['quintal', 'sala', 'cozinha', 'esquina'],
    wssRooms = roomsListNames.map(roomName => new RoomServer(roomName));
    
    wssRooms.forEach(wss => wss.onConnection());

    server.on('upgrade', (req, socket, head) => {
        const { pathname } = parse(req.url);
        wssRooms.forEach(wss => {
            if (wss.roomName === pathname.substr(1)) {
                wss.handleUpgrade(req, socket, head);
            }
        })
    });
}