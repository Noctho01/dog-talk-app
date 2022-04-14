import jwt from "jsonwebtoken";
import envConfig from "../../envConfig.js";
import { WebSocketServer } from "ws";
import { canineProfileServices } from "../../application/services/CanineProfileServices.js";
import { roomServices } from "../../application/services/RoomServices.js";

class RoomServer extends WebSocketServer {
    constructor(noServer, roomName) {
        super({ noServer: noServer });
        this.roomName = roomName;
    }

    async roomMembersNotify() {
        try {
            const result = await canineProfileServices.findAll();
            const profiles = [];
            result.forEach(user => {
                if (user.canineProfile && user.canineProfile.roomName === this.roomName) {
                    profiles.push(user.canineProfile)
                }
            })
            
            this.clients.forEach(client => {
                client.send(JSON.stringify({
                    type: 'room_members_updated',
                    membersInRoom: profiles
                }));
            });

            console.log('sala notificada')
        } catch (err) {
            console.error(err);
        }
    }

    onconnection(clientListen, req) {
        try {
            roomServices.emit(`update_${this.roomName.toLowerCase()}`);

            clientListen.on("message", msgBuffer => {
                const msg = msgBuffer.toString();
                const token = req.headers.cookie.substr(20)
                
                jwt.verify(token, envConfig.SECRET_KEY, async (err, decode) => {
                    if (err) return this.emit('error', err);
                    const {canineProfile} = await canineProfileServices.findOne(decode.id);

                    this.clients.forEach(client => {
                        if (client !== clientListen) {
                            client.send(JSON.stringify({
                                type: 'message',
                                body: {
                                    message: msg,
                                    breed: canineProfile.breed,
                                    profilePictureUrl: canineProfile.profilePictureUrl
                                }
                            }));
                        }
                    })
                });
            });

            clientListen.on("close", () => {
                console.log('desconnected')
                const token = req.headers.cookie.substr(20)
                jwt.verify(token, envConfig.SECRET_KEY, async (err, decode) => {
                    if (err) return this.emit('error', err);
                    console.log('iniciando delete de perfil canino');
                    await canineProfileServices.delete(decode.id);
                    await roomServices.removeInRoom(this.roomName, decode.id);
                });
            });

        } catch (err) {
            console.error(err);
        }
    }
}

export const quintalServer = new RoomServer(true, 'quintal');
export const salaServer = new RoomServer(true, 'sala');
export const cozinhaServer = new RoomServer(true, 'cozinha');
export const esquinaServer = new RoomServer(true, 'esquina');

quintalServer.on("connection", quintalServer.onconnection);
quintalServer.on("error", err => console.log(err.message));

salaServer.on("connection", salaServer.onconnection);
salaServer.on("error", err => console.log(err.message));

cozinhaServer.on("connection", cozinhaServer.onconnection);
cozinhaServer.on("error", err => console.log(err.message));

esquinaServer.on("connection", esquinaServer.onconnection);
esquinaServer.on("error", err => console.log(err.message));