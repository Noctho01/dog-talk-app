export class CanineProfileRepository {

    constructor(UserModel) {
        this._userModel = UserModel;
    }

    async findAll(condition) {
        return await this._userModel.find(condition, 'canineProfile');
    }

    async findById(id) {
        return await this._userModel.findById(id, 'canineProfile');
    }

    async updateById(id, updated){
        return await this._userModel.updateOne({ _id: id }, {
            canineProfile: updated
        });
    }

    async deleteById(id){
        return await this._userModel.updateOne({ _id: id }, { canineProfile: null });
    }
}