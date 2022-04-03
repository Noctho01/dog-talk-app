// Libs
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

// My Modules
import { router } from './route/routes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// instaniando application
const application = express();

// parsers
application
.use(express.urlencoded({ extended: true }))
.use(express.json())
.use(cookieParser());

// middlewares
application
.use((req, res, next) => {        
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    application.use(cors({ credentials: true }));
    next();
})
.use(router)
.use(errorMiddleware);

export { application }