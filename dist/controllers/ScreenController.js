"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ScreenClass_1 = require("../ScreenClass");
var ScreenController = (function () {
    function ScreenController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    ScreenController.prototype.getIndexFromId = function (searchId) {
        return ScreenClass_1.default.screens.findIndex(function (i) { return i.displayId === searchId; });
    };
    ScreenController.prototype.getScreen = function (req, res) {
        var displayIndex = this.getIndexFromId(req.params.id);
        if (displayIndex !== -1) {
            ScreenClass_1.default.screens[displayIndex].timer.update();
            res.send(ScreenClass_1.default.screens[displayIndex]);
        }
        else {
            console.error('Screen ' + req.params.id + ' does not exist. It can not be returned.');
        }
    };
    ScreenController.prototype.newScreen = function (req, res) {
        var displayId = req.body.displayId;
        var displayIp = req.ip;
        var displayIndex = this.getIndexFromId(displayId);
        if (displayIndex === -1) {
            ScreenClass_1.default.screens[ScreenClass_1.default.totalScreens] = new ScreenClass_1.default(displayId, displayIp);
        }
        else {
            console.log('Screen ' + displayId + ' does already exist.');
        }
        res.json({
            arrayNumber: ScreenClass_1.default.totalScreens,
            id: ScreenClass_1.default.screens[ScreenClass_1.default.totalScreens - 1].displayId,
        });
    };
    ScreenController.prototype.clearScreen = function (req, res) {
        var _this = this;
        var todo = req.body;
        todo.forEach(function (element) {
            var displayIndex = _this.getIndexFromId(element.displayId);
            if (displayIndex !== -1) {
                ScreenClass_1.default.screens[displayIndex].clear();
            }
            else {
                console.error('Screen ' + element.displayId + ' does not exist. It can not be cleared.');
            }
        });
        res.json({
            test: 'test',
        });
    };
    ScreenController.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/:id', function (req, res) {
            console.log('\x1b[40m');
            _this.getScreen(req, res);
        });
        this.router.post('/', function (req, res) {
            console.log('\x1b[40m');
            _this.newScreen(req, res);
        });
        this.router.put('/clear', function (req, res) {
            console.log('\x1b[40m');
            _this.clearScreen(req, res);
        });
    };
    return ScreenController;
}());
exports.ScreenController = ScreenController;
exports.default = new ScreenController();
