"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DataClass_1 = require("../DataClass");
var DisplayClass_1 = require("../DisplayClass");
var DisplayController = (function () {
    function DisplayController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    DisplayController.prototype.getIndexFromId = function (searchId) {
        return DisplayClass_1.default.displays.findIndex(function (i) { return i.displayId === searchId; });
    };
    DisplayController.prototype.getDisplay = function (req, res) {
        var displayIndex = this.getIndexFromId(req.params.id);
        if (displayIndex !== -1) {
            DisplayClass_1.default.displays[displayIndex].timer.update();
            res.send(DisplayClass_1.default.displays[displayIndex]);
        }
        else {
            console.error('Display ' + req.params.id + ' does not exist. It can not be returned.');
        }
    };
    DisplayController.prototype.addDisplay = function (displayId, displayIp) {
        var configIndex = DataClass_1.default.findDisplayInConfig(displayId);
        DataClass_1.default.data[configIndex.roomIndex].displays[configIndex.displayIndex].active = true;
    };
    DisplayController.prototype.newDisplay = function (req, res) {
        this.addDisplay(req.body.displayId, req.ip);
    };
    DisplayController.prototype.clearDisplay = function (req, res) {
        var _this = this;
        var todo = req.body;
        todo.forEach(function (element) {
            var displayIndex = _this.getIndexFromId(element.displayId);
            if (displayIndex !== -1) {
                DisplayClass_1.default.displays[displayIndex].clear();
            }
            else {
                console.error('Display ' + element.displayId + ' does not exist. It can not be cleared.');
            }
        });
        res.json({
            test: 'test',
        });
    };
    DisplayController.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/:id', function (req, res) {
            _this.getDisplay(req, res);
        });
        this.router.post('/', function (req, res) {
            _this.newDisplay(req, res);
        });
        this.router.put('/clear', function (req, res) {
            _this.clearDisplay(req, res);
        });
    };
    return DisplayController;
}());
exports.DisplayController = DisplayController;
exports.default = new DisplayController();
