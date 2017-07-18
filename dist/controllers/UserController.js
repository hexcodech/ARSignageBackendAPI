"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController = (function () {
    function UserController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    UserController.prototype.get = function (req, res) {
        res.json({
            message: 'User',
        });
    };
    UserController.prototype.initRoutes = function () {
        this.router.get('/', this.get);
    };
    return UserController;
}());
exports.UserController = UserController;
exports.default = new UserController();
