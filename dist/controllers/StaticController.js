"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var StaticController = (function () {
    function StaticController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    StaticController.prototype.getFrontend = function (req, res) {
        console.log(__dirname + '/frontend.html');
        res.sendFile('index.html', { root: __dirname + '/../../frontend/' });
    };
    StaticController.prototype.initRoutes = function () {
        this.router.get('/:displayId/', express.static(__dirname + '/../frontend'));
    };
    return StaticController;
}());
exports.StaticController = StaticController;
exports.default = new StaticController();
