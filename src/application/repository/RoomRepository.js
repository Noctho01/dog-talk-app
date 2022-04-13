export class RoomRepository {

    /**
     * @param {Object} roomModel 
     */
    constructor(roomModel) {
        this._roomModel = roomModel;
    }

    /**
     * @param {String} roomid 
     * @param {String} projection 
     * @returns  {Promise<UserModel>}
     */
    async findOne(condition, projection) {
        return await this._roomModel.findOne(condition, projection)
    }

    async deleteById(roomid) {
        return await this._roomModel.deleteOne({ _id: roomid });
    }

    async findAll(projection) {
        return await this._roomModel.find().exec();
    }

    async update(condition, updated){
        return await this._roomModel.updateOne(condition, updated);
    }
}