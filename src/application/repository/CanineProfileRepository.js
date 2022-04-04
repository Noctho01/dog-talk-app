export class CanineProfileRepository {

    constructor(CanineProfileModel) {
        this._canineProfileModel = CanineProfileModel;
    }

    async create(canineProfileData) {
        this._canineProfileModel.create(canineProfileData);
    }

    async findOne(props, projection) {
        return await this._canineProfileModel.findOne(props, projection);
    }

    async deleteById(canineProfileId) {
        return await this._canineProfileModel.deleteOne({ _id: canineProfileId });
    }

    async update(condition, updated){
        return await this._canineProfileModel.updateOne(condition, updated);
    }
}