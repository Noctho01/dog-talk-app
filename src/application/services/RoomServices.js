import { InterfaceServices } from "./InterfaceServices.js";
import { RoomModel } from '../model/RoomModel.js';
import { RoomRepository } from '../repository/RoomRepository.js';

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

    async getInRoom(roomName) {
        return await this.dependences.repository.findOne({ name: roomName }, 'inRoom');
    }

    /**
     * @description Adiciona mais um id de uma entidade CanineProfile ao array inRoom de Room
     * @param {String} userid
     */
    async addInRoom(roomName, userid) {
        const inRoom = await this.dependences.repository.findOne({ name: roomName }, 'inRoom');
        if (inRoom.include({ _id: userid })) return this.emit('error', new Error('este usuario já é um membro desta sala'));
        inRoom.push({ _id: userid });
        await inRoom.save();
        return this.emit(`updated_${roomName.toLower()}`);
    }

    async removeInRoom(roomName, userid) {
        let inRoom = await this.dependences.repository.findOne({ name: roomName }, 'inRoom');
        if (!inRoom.include({ _id: userid })) return this.emit('error', new Error('este usuario não é um membro desta sala'));
        inRoom = inRoom.filter(user => user._id !== userid);
        await inRoom.save();
        return this.emit(`update_${roomName.toLowerCase()}`);
    }
}


export const roomServices = new RoomServices();

const roomRepository = new RoomRepository(RoomModel);
roomServices.injectionDependences({ repository: roomRepository });

// Escuta de eventos
// roomServices.on(`update_${roomName.toLowerCase()}`)...