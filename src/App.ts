import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';

import BaseController from './controllers/BaseController';
import ScreenController from './controllers/ScreenController';

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
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        // this.express.use(require('connect').bodyParser());express.bodyParser()
    }

    private routes(): void   {
        this.express.use('/', BaseController.router);
        this.express.use('/screen', ScreenController.router);
    }
}

export default new App().express;
