"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ScreenClass_1 = require("../ScreenClass");
var ScreenController = (function () {
    function ScreenController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    ScreenController.prototype.get = function (req, res) {
        res.json({
            message: 'Screen',
        });
    };
    ScreenController.prototype.newScreen = function (req, res) {
        var ScreenId = req.params.id;
        ScreenClass_1.default.screens[ScreenClass_1.default.totalScreens] = new ScreenClass_1.default('ScreenId');
        console.log(ScreenClass_1.default.screens[ScreenClass_1.default.totalScreens]);
        res.json({
            arrayNumber: ScreenClass_1.default.totalScreens,
            test: ScreenClass_1.default.screens[ScreenClass_1.default.totalScreens].test,
            message: ScreenClass_1.default.screens[ScreenClass_1.default.totalScreens].id,
        });
        ScreenClass_1.default.totalScreens++;
    };
    ScreenController.prototype.initRoutes = function () {
        this.router.get('/', this.get);
        this.router.put('/', this.newScreen);
    };
    return ScreenController;
}());
exports.ScreenController = ScreenController;
exports.default = new ScreenController();
