export class RoomModelTest {
    constructor() {
        this.roomDb = [
            { _id:'123', name: 'Quintal (Sala1)', limit: 10, inRoom: [
                { canineProfileId: '123' },
                { canineProfileId: '111' },
                { canineProfileId: '222' },
            ]},
            { _id:'321', name: 'Esquina (Sala2)', limit: 10, inRoom: [
                { canineProfileId: '852' },
                { canineProfileId: '852' },
                { canineProfileId: '369' },
                { canineProfileId: '365' },
                { canineProfileId: '368' },
            ]},
            { _id:'312', name: 'Cozinha (Sala3)', limit: 4, inRoom: [
                { canineProfileId: '777' }
            ]},
            { _id:'132', name: 'Quarto (Sala4)', limit: 4, inRoom: []}
        ];
    }

    async findOne(props) {
        let findeds;
        this.roomDb.forEach(room => {
            Object.keys(props).forEach(prop => {
                if (room[prop] === props[prop]) findeds = room;
            });
        });
        return findeds;
    }

    async findById(roomid) {
        return this.roomDb.find(room => room._id === roomid);
    }

    async findAll() {
        return this.roomDb;
    }

    async updateOne(condition, updated){
        let result = false;
        this.roomDb.forEach(room => {
            Object.keys(condition).forEach(prop => {
                if (room[prop] === condition[prop]) {
                    result = true;
                    Object.keys(updated).forEach(propUd => {
                        room[propUd] = updated[propUd];
                    });
                }
            });
        });

        return result;
    }
}