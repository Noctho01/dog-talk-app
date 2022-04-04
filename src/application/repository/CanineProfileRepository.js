export class CanineProfileRepository {

    constructor(CanineProfileModel) {
        this._canineProfileModel = CanineProfileModel;
    }

    async create(canineProfileData) {
        const canineProfile = new this._canineProfileModel(canineProfileData);
        await canineProfile.save();
        return canineProfile;
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