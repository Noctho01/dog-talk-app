import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

import envConfig from "../../envConfig.js";

import { RoomModel } from '../../application/model/RoomModel.js';
import { RoomRepository } from '../../application/repository/RoomRepository.js';
import { Room } from "../../application/domain/Room.js";

import { UserModel } from '../../application/model/UserModel.js';
import { CanineProfile } from "../../application/domain/CanineProfile.js";
import { CanineProfileRepository } from "../../application/repository/CanineProfileRepository.js";

const
roomRepository = new RoomRepository(RoomModel),
canineProfileRepository = new CanineProfileRepository(UserModel);

Room.initRepository(roomRepository);
CanineProfile.initRepository(canineProfileRepository);

export class RoomServer {

    /**@private @type {String}*/
    #roomName;

    /**@private @type {WebSocketServer}*/
    #wss;

    constructor(roomName) {
        this.#roomName = roomName;
        this.#wss = new WebSocketServer({ noServer: true });
    }

    get roomName() {
        return this.#roomName;
    }

    // estabelece contrato com o cliente pelo servidor http
    handleUpgrade(req, socket, head) {
        return this.#wss.handleUpgrade(req, socket, head, ws => {
            this.#wss.emit('connection', ws, req);
        });
    }

    // inicia conexão deste servidor ws
    onConnection() {
        console.log("iniciando servidor:", this.#roomName)

        this.#wss.on('connection', (ws, req) => {
            console.log('alguem acessou o servidor', this.#roomName);

            ws.on('message', async dataBuffer => {
                const data = JSON.parse(dataBuffer);
                
                switch(data.type) {
                    case "req_room_data":
                        const membersInRoom = await this.#getRoomDataProcess();
                        this.#emit(ws, 'res_room_data', { membersInRoom });
                        break;

                    case "1":
                        break;
                    case "2":
                        break;
                    case "3":
                        break;
                    case "4":
                        break;
                    case "5":
                        break;
                    case "6":
                        break;
                    case "7":
                        break;
                    default:
                        break;
                }

            });


            ws.on('close', () => {
                const token = req.headers.cookie.substr(20)

                this.#wss.clients.forEach(client => {
                    this.#emit(client, "delete_canine_profile", 'ola')
                })

                jwt.verify(token, envConfig.SECRET_KEY, async (err, decode) => {
                    if (err) throw err
                    const canineProfile = await CanineProfile.initWithId(decode.id);

                    if (canineProfile.breed) {
                        const
                        room = await Room.initWithName(this.#roomName);

                        console.log({
                            id: canineProfile.id,
                            inRoom: room.inRoom
                        })

                        room.removeInRoom({ _id: canineProfile.id });
                        room.save();
                        canineProfile.delete();
                        
                        console.log('canineProfile deletado');

                    } else {
                        console.log('não existe perfil')
                    }
                });
            });
        });
    }

    // emite um evento
    #emit(ws, type, body) { ws.send(JSON.stringify({ type, body })) }

    // processo de busca de dados do usuario
    async #getRoomDataProcess() {
        const room = await Room.initWithName(this.#roomName);
        const canineProfiles = await CanineProfile.repository.findAll({_id: { $in: room.inRoom.map(user => user._id)}}, { canineProfile: { breed: 1, profilePictureUrl: 1}});
        
        return canineProfiles.map(user => ({
            breed: user.canineProfile.breed,
            profilePictureUrl: user.canineProfile.profilePictureUrl
        }));
    }
}