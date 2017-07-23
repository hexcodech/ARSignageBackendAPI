"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ScreenClass_1 = require("../ScreenClass");
var ScreenController = (function () {
    function ScreenController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    ScreenController.prototype.testMethod = function () {
        console.log('test');
    };
    ScreenController.prototype.get = function (req, res) {
        this.testMethod();
        res.json({
            message: 'Screen',
        });
    };
    ScreenController.prototype.newScreen = function (req, res) {
        var newScreenName = req.body.id;
        console.log(newScreenName);
        ScreenClass_1.default.screens[ScreenClass_1.default.totalScreens] = new ScreenClass_1.default(newScreenName);
        this.testMethod();
        console.log(JSON.stringify(ScreenClass_1.default.screens));
        res.json({
            arrayNumber: ScreenClass_1.default.totalScreens,
            message: ScreenClass_1.default.screens[ScreenClass_1.default.totalScreens].id,
            test: ScreenClass_1.default.screens[ScreenClass_1.default.totalScreens].test,
        });
        ScreenClass_1.default.totalScreens++;
    };
    ScreenController.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/', function (req, res) {
            _this.get(req, res);
        });
        this.router.post('/', this.newScreen);
    };
    return ScreenController;
}());
exports.ScreenController = ScreenController;
exports.default = new ScreenController();
