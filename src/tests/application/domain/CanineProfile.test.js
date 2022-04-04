import { Log as log } from '../../../jobs/log.js';
import { CanineProfile } from "../../../application/domain/CanineProfile.js";
import { CanineProfileRepository } from '../../../application/repository/CanineProfileRepository.js';
import { CanineProfileModelTest } from './EntityModel/CanineProfileModelTest.js';
import axios from 'axios';

const
canineProfileFakeDatabase = new CanineProfileModelTest(),
canineProfileRepository = new CanineProfileRepository(canineProfileFakeDatabase);

CanineProfile.initRepository(canineProfileRepository);
CanineProfile.initAxios(axios);

/**
 * @description O que testar no Dominio CanineProfile
 */
describe('CanineProfileDomain:: Dependence Injection', () => {
    it('CanineProfileRepository dependence is injected', () => {
        expect(CanineProfile.repositoryExist()).toBe(true);
    });

    it('Axios dependence is injected', () => {
        expect(CanineProfile.axiosExist()).toBe(true);
    });
});

describe('Gerando um Perfil Canino', () => {
    const inRoom = ['boxer', 'akita'];

    it('Perfil gerado com sucesso', async () => {
        const canineProfile = await CanineProfile.init('quintal', inRoom);
        expect(canineProfile.breed).not.toEqual('boxer');
    });

    it('Perfil salvo com sucesso', async () => {
        const canineProfile = await CanineProfile.init('quintal', inRoom);
        await expect(canineProfile.save()).toBeTruthy();
    });
});

