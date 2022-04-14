import { InterfaceServices } from "./InterfaceServices.js";
import { RoomModel } from '../model/RoomModel.js';
import { RoomRepository } from '../repository/RoomRepository.js';
import { quintalServer, salaServer, esquinaServer, cozinhaServer } from "../../websocket/application/RoomServerProvisori.js";

class RoomServices extends InterfaceServices {

    /**
     * @description Retorna array com todos as salas
     * @returns {Array<Room>}
     */
    async findAll() {
        const rooms = await this.dependences.repository.findAll('name limit inRoom');
        if (!rooms || rooms.length === 0) return this.emit('error', new Error('Salas não encontradas'));
        return rooms;
    }

    async getRoom(roomName) {
        return await this.dependences.repository.findOne({ name: roomName }, 'inRoom limit');
    }   

    /**
     * @description Adiciona mais um id de uma entidade CanineProfile ao array inRoom de Room
     * @param {String} userid
     */
    async addInRoom(roomName, userid) {
        const room = await this.dependences.repository.findOne({ name: roomName }, 'inRoom');
        if (room.inRoom.includes({ _id: userid })) return this.emit('error', new Error('este usuario já é um membro desta sala'));
        room.inRoom.push({ _id: userid });
        await room.save();
        return this.emit(`updated_${roomName.toLowerCase()}`);
    }

    async removeInRoom(roomName, userid) {
        let room = await this.dependences.repository.findOne({ name: roomName }, 'inRoom');
        if (!room.inRoom.some(user => user._id === userid )) return this.emit('error', new Error('este usuario não é um membro desta sala'));
        room.inRoom = room.inRoom.filter(user => user._id !== userid);
        await room.save();
        console.log('canine profile deletado da sala')
        return this.emit(`update_${roomName.toLowerCase()}`);
    }
}


export const roomServices = new RoomServices();

const roomRepository = new RoomRepository(RoomModel);
roomServices.injectionDependences({ repository: roomRepository });

// Escuta de eventos
roomServices.on('update_quintal', async () => await quintalServer.roomMembersNotify())
roomServices.on('update_sala', async () => await salaServer.roomMembersNotify())
roomServices.on('update_esquina', async () => await esquinaServer.roomMembersNotify())
roomServices.on('update_cozinha', async () => await cozinhaServer.roomMembersNotify())
