export class CanineProfile {

    static repository;

    static #axios;
    
    /**@type {String} */
    #id;

    /**@type {String} */
    #breed;

    /**@type {String} */
    #roomName;

    /**@type {String} */
    #profilePictureUrl;
    

    // Getter Methods
    get id() { return this.#id }
    get breed() { return this.#breed }
    get roomName() { return this.#roomName }
    get profilePictureUrl() { return this.#profilePictureUrl }
    

    /**
     * @description Metodo Statico de <Dependence Injection> dependence: repositorio 
     * @param {CanineProfileRepository} repository
     * @static
     * @public
     */
     static initRepository(repository) {
        CanineProfile.repository = repository;
    }

    /**
     * @description Retorna resposta de confirmação da existencia da dependencia repositorio no objeto CanineProfile
     * @static
     * @public
     * @returns {Boolean}
     */
     static repositoryExist() {
        return CanineProfile.repository ?true:false;
    }


    /**
     * @description Metodo Statico de <Dependence Injection> dependence: axios 
     * @param {Axios} axios 
     */
    static initAxios(axios) {
        CanineProfile.#axios = axios;
    }

    /**
     * @description Retorna resposta de confirmação da existencia da dependencia axios no objeto CanineProfile
     * @static
     * @public
     * @returns {Boolean}
     */
     static axiosExist() {
        return CanineProfile.#axios ?true:false;
    }


    /**
     * @description responsavel por consumir a api exterior e gerar um perfil canino aleatorio
     * @param {Array<String>} inRoom
     */
    static async #profileGenerator(inRoom) {
        
        const
        urltoBreedList = 'https://dog.ceo/api/breeds/list/all',
        timeout = 2000,
        method = 'GET';

        const
        provisionalCanineProfile = {},
        breeds = [],
        idInRoom = inRoom.map(user => {
            return user._id
        });

        try {
            // Pegando Nome da raça e atribuindo valor aleatorio
            const breedListResponse = await CanineProfile.#axios({ url: urltoBreedList, method, timeout });
            if (!breedListResponse.data || breedListResponse.data.status !== "success") throw new Error("primeira requisição Dog Ceo falhou");
            
            Object.keys(breedListResponse.data.message).forEach(breed => breeds.push(breed));

            if (idInRoom.length > 0) {
                let breedsInUse = await CanineProfile.repository.findAll({ _id: { $in: idInRoom }}, { canineProfile: { breed: 1 }});
                do { provisionalCanineProfile.breed = breeds[parseInt(Math.random() * ((breeds.length - 1) - 0) + 0)] }
                while (breedsInUse.includes(provisionalCanineProfile.breed));

            } else {
                provisionalCanineProfile.breed = breeds[parseInt(Math.random() * ((breeds.length - 1) - 0) + 0)]
            }

            // Pegando a url da imagem da raça especificada em #breed
            const
            urltoBreedImg = `https://dog.ceo/api/breed/${provisionalCanineProfile.breed}/images/random`,
            breedImgResponse = await CanineProfile.#axios({ url: urltoBreedImg, method, timeout});        
            if (!breedImgResponse.data || breedImgResponse.data.status !== "success") throw new Error("segunda requisição Dog Ceo falhou");
    
            provisionalCanineProfile.profilePictureUrl = breedImgResponse.data.message;

            return provisionalCanineProfile;
        
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description Retorna uma instancia de CanineProfile
     * @param {String} roomName 
     * @param {Array<String>} inRoom 
     */
    static async init(id, roomName, inRoom) {
        const
        provisionalCanineProfile = await CanineProfile.#profileGenerator(inRoom),
        canineProfile = new CanineProfile();

        canineProfile.#id = id;
        canineProfile.#breed = provisionalCanineProfile.breed;
        canineProfile.#profilePictureUrl = provisionalCanineProfile.profilePictureUrl;
        canineProfile.#roomName = roomName;
        return canineProfile;
    }


    static async initWithId(id) {
        if (!id) throw new Error('id não foidefinido');
        const result = await CanineProfile.repository.findById(id, '_id canineProfile');
        if (!result) throw new Error('Este Perfil Canino não existe');
        
        const canineProfile = new CanineProfile();

        canineProfile.#id = result._id;
        canineProfile.#breed = result.canineProfile.breed;
        canineProfile.#roomName = result.canineProfile.roomName;
        canineProfile.#profilePictureUrl = result.canineProfile.profilePictureUrl;
        return canineProfile;
    }


    /**
     * @description Metodo insere objeto<documento> ao banco de dados
     * @public
     */
    async save() {
        if (!this.#breed) throw new Error('breed não foi definido');
        if (!this.#roomName) throw new Error('roomName não foi definido');
        if (!this.#profilePictureUrl) throw new Error('profilePictureUrl não foi definido');

        const canineProfile = await CanineProfile.repository.findById(this.#id);
        if (!canineProfile) throw new Error('Perfil Canino não encontrado'); 
        
        const updateResult = await CanineProfile.repository.updateById(this.#id, {
            breed: this.#breed,
            roomName: this.#roomName,
            profilePictureUrl: this.#profilePictureUrl
        });
        if (!updateResult.acknowledged) throw new Error('As alterações deste perfil canino não foram salvas');
    }


    async delete() {
        if (!this.#id) throw new Error('id não foi definido');
        if (!this.#breed) throw new Error('breed não foi definido');
        if (!this.#roomName) throw new Error('roomName não foi definido');

        const resultDelete = await CanineProfile.repository.deleteById(this.#id);
        if (!resultDelete.acknowledged) throw new Error('processo de deletar o perfil canino falhou');
    }
}