import * as bodyParser from 'body-parser';

import * as express from 'express';
import * as morgan from 'morgan';

const cors = require('cors');

import 'es6-shim';
import 'reflect-metadata';

import BaseController from './controllers/BaseController';
import DisplayController from './controllers/DisplayController';
import MediaController from './controllers/MediaController';
import StaticController from './controllers/StaticController';

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
        // this.express.use('/frontend', express.static(__dirname + '/../frontend'));
        this.express.use('/static', express.static(__dirname + '/../media'));
        this.express.use('/frontend/:displayid/', express.static(__dirname + '/../frontend'));
        this.express.use('/dashboard', express.static(__dirname + '/../dashboard'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cors());
        
    }

    private routes(): void   {
        this.express.use('/', BaseController.router);
        this.express.use('/display', DisplayController.router);
        this.express.use('/media', MediaController.router);
    }
}

export default new App().express;
