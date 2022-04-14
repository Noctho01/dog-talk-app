import { InterfaceServices } from "./InterfaceServices.js";
import { UserModel } from "../model/UserModel.js";
import { CanineProfileRepository } from "../repository/CanineProfileRepository.js";
import axios from "axios";

class CanineProfileServices extends InterfaceServices {    
    /**
     * @description responsavel por consumir a api exterior e gerar um perfil canino aleatorio
     * @param {Array<String>} inRoom
     */
    async #profileGenerator(inRoom) {
        const
        urltoBreedList = 'https://dog.ceo/api/breeds/list/all',
        timeout = 0,
        method = 'GET';

        const
        provisionalCanineProfile = {},
        breeds = [],
        idInRoom = inRoom.map(user => {
            return user._id
        });

        // Pegando Nome da raça e atribuindo valor aleatorio
        const breedListResponse = await this.dependences.axios({ url: urltoBreedList, method, timeout });
        if (!breedListResponse.data || breedListResponse.data.status !== "success") return this.emit('error', new Error("primeira requisição Dog Ceo falhou"));
        
        Object.keys(breedListResponse.data.message).forEach(breed => breeds.push(breed));

        if (idInRoom.length > 0) {
            let breedsInUse = await this.dependences.repository.findAll({ _id: { $in: idInRoom }}, { canineProfile: { breed: 1 }});
            do { provisionalCanineProfile.breed = breeds[parseInt(Math.random() * ((breeds.length - 1) - 0) + 0)] }
            while (breedsInUse.includes(provisionalCanineProfile.breed));

        } else {
            provisionalCanineProfile.breed = breeds[parseInt(Math.random() * ((breeds.length - 1) - 0) + 0)]
        }

        // Pegando a url da imagem da raça especificada em #breed
        const
        urltoBreedImg = `https://dog.ceo/api/breed/${provisionalCanineProfile.breed}/images/random`,
        breedImgResponse = await this.dependences.axios({ url: urltoBreedImg, method, timeout});        
        if (!breedImgResponse.data || breedImgResponse.data.status !== "success") return this.emit('error', new Error("segunda requisição Dog Ceo falhou"));

        provisionalCanineProfile.profilePictureUrl = breedImgResponse.data.message;

        return provisionalCanineProfile;
    }

    async create(userid, roomName, inRoom) {
        const canineProfile = await this.#profileGenerator(inRoom);
        canineProfile.roomName = roomName;
        
        const updateResult = await this.dependences.repository.updateById(userid, {
            breed: canineProfile.breed,
            roomName: roomName,
            profilePictureUrl: canineProfile.profilePictureUrl
        });
        if (!updateResult.acknowledged) return this.emit('error', new Error('As alterações deste perfil canino não foram salvas'));
    }

    async findAll(condition) {
        const profiles = await this.dependences.repository.findAll(condition);
        if (profiles.length === 0) return this.emit('error', new Error('Perfis não encontrados'));
        return profiles;
    }

    async findOne(userid) {
        const user = await this.dependences.repository.findById(userid );
        if (!user) return this.emit('error', new Error('Usuario não encontrado'));
        if (!user.canineProfile.breed) return this.emit('error', new Error('Perfil não encontrado'));
        return user;
    }

    async delete(userid) {
        const resultDelete = await this.dependences.repository.deleteById(userid);
        if (!resultDelete.acknowledged) return this.emit('error', new Error('processo de deletar o perfil canino falhou'));
        console.log('canine profile deletado de user')
    }
}


export const canineProfileServices = new CanineProfileServices();

const canineProfileRepository = new CanineProfileRepository(UserModel);
canineProfileServices.injectionDependences({ repository: canineProfileRepository, axios });