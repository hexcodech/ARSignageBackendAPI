"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var morgan = require("morgan");
var cors = require('cors');
require("es6-shim");
require("reflect-metadata");
var BaseController_1 = require("./controllers/BaseController");
var DisplayController_1 = require("./controllers/DisplayController");
var MediaController_1 = require("./controllers/MediaController");
var App = (function () {
    function App() {
        this.express = express();
        this.middlewares();
        this.routes();
    }
    App.prototype.middlewares = function () {
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing') {
            this.express.use(morgan('dev'));
        }
        this.express.use('/static', express.static(__dirname + '/../media'));
        this.express.use('/frontend/:displayid/', express.static(__dirname + '/../frontend'));
        this.express.use('/dashboard', express.static(__dirname + '/../dashboard'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cors());
    };
    App.prototype.routes = function () {
        this.express.use('/', BaseController_1.default.router);
        this.express.use('/display', DisplayController_1.default.router);
        this.express.use('/media', MediaController_1.default.router);
    };
    return App;
}());
exports.default = new App().express;
