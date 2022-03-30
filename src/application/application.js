// Libs
import path from 'path';
import express from 'express';
import { renderFile } from 'ejs';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// My Modules
import { router } from './route/routes.js';

// configurando uso do __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname	= path.dirname(__filename)

// instaniando application
const application = express();

// Configurando application

// render enginer
application
    .engine('html', renderFile)
    .set('view engine', 'html')
    .set('views', path.resolve(__dirname, 'views'));

// parsers
application
    .use(express.urlencoded({ extended: true }))
    .use(express.static('./views/public'))
    .use(express.json())
    .use(cookieParser());

// middlewares
application
    .use(router);

export { application }