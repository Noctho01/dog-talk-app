import { Log as log} from '../../jobs/log.js';

describe('log object', () => {
    it('é uma function', () => {
        expect(typeof log).toBe('function');
    });
});

describe('log.error::', () => {
    it('log.error é uma function', () => {
        expect(typeof log.error).toBe('function');
    });
    
    it('console.log', () => {
        try {
            let nome = 'vinicius';
            nome.vinicius.idade = 25;
        } catch (err) {
            log.error(err);
        }
    });
});

describe('log.event::', () => {
    it('é uma function', () => {
        expect(typeof log.event).toBe("function");
    });

    it('console.log', () => {
        let eventName = 'user-created', eventMsg = 'o usuario <nome do usuario aqui>  está salvo no banco de dados Users'
        log.event(eventName, eventMsg);
    });
});

describe('log.debug::', () => {
    it('é uma function', () => {
        expect(typeof log.debug).toBe("function");
    });

    it('console.log', () => {
        let path = 'tests/jobs/log.test.js', line = 42, msg = 'testando o log.debug';
        log.debug(path, line, msg);
    });
});

describe('log.web::', () => {
    it('é uma function', () => {
        expect(typeof log.web).toBe('function');
    });

    it('console.log', () => {
        let endpoint = '/user/15/nome/';
        let statusCode = [200, 201, 301, 404, 400, 500];

        log.web('get', endpoint, statusCode[0]);
        log.web('post', endpoint, statusCode[1]);
        log.web('put', endpoint, statusCode[2]);
        log.web('delete', endpoint, statusCode[3]);
        log.web('delete', endpoint, statusCode[4]);
        log.web('get', endpoint, statusCode[5]);
        log.web();
    });
});
