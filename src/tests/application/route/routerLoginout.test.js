import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3030',
    timeout: 1000,
    headers: {
        'X-Powered-By': 'PHP/5.5.9-1ubuntu4.11',
        
    }
})

describe('fazendo login', () => {

});