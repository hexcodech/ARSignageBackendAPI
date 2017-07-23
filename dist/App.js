"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var morgan = require("morgan");
var BaseController_1 = require("./controllers/BaseController");
var ScreenController_1 = require("./controllers/ScreenController");
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
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    };
    App.prototype.routes = function () {
        this.express.use('/', BaseController_1.default.router);
        this.express.use('/screen', ScreenController_1.default.router);
    };
    return App;
}());
exports.default = new App().express;
