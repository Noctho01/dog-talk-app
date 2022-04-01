import { Log as log } from '../../../jobs/log.js';
import { Room } from "../../../application/domain/Room.js";
import { RoomRepository } from '../../../application/repository/RoomRepository.js';
import { RoomModelTest } from './EntityModel/RoomModelTest.js';

/**
 * @description O que testar no Dominio Room
 */
describe('roomDomain::', () => {
    const roomFakeDatabase = new RoomModelTest();
    const roomRepository = new RoomRepository(roomFakeDatabase);
    Room.initRepository(roomRepository);
    
    it('Room.repository esta instanciado', () => expect(Room.repositoryExist()).toBe(true));

    it('roomDomain é uma instancia de Room', async () => {
        let roomDomain = await Room.initWithId('123');
        expect(roomDomain).toBeInstanceOf(Room);
    });

    it('Room.initWithId(sem id) error', async () => {
        await expect(Room.initWithId()).rejects.toThrowError("id da sala não foi informado");
    });

    it('roomDomain.id success', async () => {
        let id = "123";
        let roomDomain = await Room.initWithId(id);
        expect(roomDomain.id).toEqual(id);
    });

    it('roomDomain.name success)', async () => {
        let id = "123";
        let name = "Quintal (Sala1)";
        let roomDomain = await Room.initWithId(id);
        expect(roomDomain.name).toEqual(name);
    });

    it('roomDomain.limit success)', async () => {
        let id = "123";
        let limit = 10;
        let roomDomain = await Room.initWithId(id);
        expect(roomDomain.limit).toEqual(limit);
    });

    it('roomDomain.inRoom success)', async () => {
        let id = "123";
        let inRoom = [
            { canineProfileId: '123' },
            { canineProfileId: '111' },
            { canineProfileId: '222' },
        ];

        let roomDomain = await Room.initWithId(id);
        expect(roomDomain.inRoom).toEqual(inRoom);
    });

    it('rooDomain.save success', async () => {
        let id = "123";
        let roomDomain = await Room.initWithId(id);
        roomDomain.addInRoom("666");
        await expect(roomDomain.save()).toBeTruthy();
    });

    it('roomDomain.save error "Sala não encontrada"', async () => {
        let nwid = "888";
        let id = "123";
        let rooDomain = await Room.initWithId(id);

        roomFakeDatabase.roomDb.forEach(room => {
            if (room._id === id) {
                room._id = nwid;
            }
        })

        await expect(rooDomain.save()).rejects.toThrowError("Sala não encontrada");
    });
});