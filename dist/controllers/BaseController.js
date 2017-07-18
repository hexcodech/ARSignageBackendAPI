"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BaseController = (function () {
    function BaseController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    BaseController.prototype.get = function (req, res) {
        res.json({
            message: 'Hello World',
        });
    };
    BaseController.prototype.initRoutes = function () {
        this.router.get('/', this.get);
    };
    return BaseController;
}());
exports.BaseController = BaseController;
exports.default = new BaseController();
