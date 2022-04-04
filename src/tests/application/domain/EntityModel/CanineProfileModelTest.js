export class CanineProfileModelTest {
    constructor() {
        this.canineProfileDb = [
            {_id:'123456789', breed: 'boxer', rooName: 'quintal', profilePictureUrl: 'https://images.dog.ceo/breeds/boxer/n02108089_522.jpg' },
            {_id:'123456787', breed: 'akita', rooName: 'quintal', profilePictureUrl: 'https://images.dog.ceo/breeds/akita/Akita_inu_blanc.jpg' },
        ];
    }

    async findOne(props) {
        let findeds;
        this.canineProfileDb.forEach(canineProfile => {
            Object.keys(props).forEach(prop => {
                if (canineProfile[prop] === props[prop]) findeds = canineProfile;
            });
        });
        return findeds;
    }

    async create(props) {
        this.canineProfileDb.push(props);
    }

    async deleteOne(prop) {
        const canineProfile = this.canineProfileDb.find(canineProfile => canineProfile._id === prop._id);
        if (!canineProfile) return { deletedCount: 0 };
        this.canineProfileDb.splice(this.canineProfileDb.indexOf(canineProfile), 1);
        return { deletedCount: 1 };
    }

    async updateOne(condition, updated){
        let result = false;
        this.canineProfileDb.forEach(canineProfile => {
            Object.keys(condition).forEach(prop => {
                if (canineProfile[prop] === condition[prop]) {
                    result = true;
                    Object.keys(updated).forEach(propUd => {
                        canineProfile[propUd] = updated[propUd];
                    });
                }
            });
        });

        return result;
    }
}