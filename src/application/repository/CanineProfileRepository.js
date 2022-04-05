export class CanineProfileRepository {

    constructor(UserModel) {
        this._userModel = UserModel;
    }

    async findAll(condition, projection) {
        return await this._userModel.find(condition, projection);
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