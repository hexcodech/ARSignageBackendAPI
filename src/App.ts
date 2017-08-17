import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';

import 'es6-shim';
import 'reflect-metadata';

import BaseController from './controllers/BaseController';
import DisplayController from './controllers/DisplayController';
import MediaController from './controllers/MediaController';
import StaticController from './controllers/StaticController';

// var io = require('socket.io')(http);

class App   {
    public express: express.Application;
    
    constructor()   {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void  {
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing') {
            this.express.use(morgan('dev'));
        }
        this.express.use('/frontend', express.static(__dirname + '/../frontend'));
        this.express.use('/static', express.static(__dirname + '/../media'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        
    }

    private routes(): void   {
        this.express.use('/', BaseController.router);
        this.express.use('/display', DisplayController.router);
        this.express.use('/frontend', StaticController.router);
        this.express.use('/media', MediaController.router);
    }
}

export default new App().express;
