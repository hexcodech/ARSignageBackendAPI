"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DataClass_1 = require("../DataClass");
var DisplayController = (function () {
    function DisplayController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    DisplayController.prototype.addDisplay = function (displayId, socketId) {
        var dataIndex = DataClass_1.default.findDisplayInConfig(displayId);
        if (dataIndex.displayIndex !== -1) {
            DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].active = true;
            DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].socketId = socketId;
        }
        else {
            console.error('Display ' + displayId + ' can not be added because it is not present in config');
        }
    };
    DisplayController.prototype.removeDisplay = function (displayId) {
        var dataIndex = DataClass_1.default.findDisplayInConfig(displayId);
        if (dataIndex.displayIndex !== -1) {
            DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].active = false;
            DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].socketId = null;
        }
        else {
            console.error('Display ' + displayId + ' can not be removed because it is not present in config');
        }
    };
    DisplayController.prototype.getDisplay = function (req, res) {
        console.log('get one Display');
        var dataIndex = DataClass_1.default.findDisplayInConfig(req.params.id);
        if (dataIndex.displayIndex !== -1) {
            DataClass_1.default.data[dataIndex.roomIndex].timer.update();
            res.send(DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex]);
        }
        else {
            console.error('Display ' + req.params.id + ' does not exist. It can not be returned.');
            res.json({
                works: 'nope',
            });
        }
    };
    DisplayController.prototype.getDisplays = function (req, res) {
        console.log('get all displays');
        res.send(DataClass_1.default.data);
    };
    DisplayController.prototype.newDisplay = function (req, res) {
        this.addDisplay(req.body.displayId, req.ip);
        res.json({
            id: 'works',
        });
    };
    DisplayController.prototype.updateDisplay = function (req, res) {
        var dataIndex = DataClass_1.default.findDisplayInConfig(req.params.id);
        this.updateDisplayState(dataIndex, req.body.display);
        res.send(DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex]);
    };
    DisplayController.prototype.updateDisplayState = function (dataIndex, displayObject) {
        console.log('try to update display: ' + displayObject.displayId);
        for (var key in displayObject) {
            if (displayObject.hasOwnProperty(key) && displayObject[key] !== null) {
                if (key === 'media') {
                    for (var subkey in displayObject[key]) {
                        if (displayObject[key].hasOwnProperty(subkey) && displayObject[key][subkey] !== null) {
                            DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex][key][subkey] = displayObject[key][subkey];
                        }
                    }
                }
                else if (key === 'displayId' || key === 'friendlyName' || key === 'timer' || key === 'target'
                    || key === 'lastUpdated' || key === 'isFetching' || key === 'didInvalidate' || key === 'socketId') {
                }
                else {
                    DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex][key] = displayObject[key];
                }
            }
        }
        DataClass_1.default.data[dataIndex.roomIndex].timer.update();
    };
    DisplayController.prototype.clearDisplay = function (req, res) {
        var todo = req.body.displayIds;
        console.log(req.body);
        todo.forEach(function (element) {
            var dataIndex = DataClass_1.default.findDisplayInConfig(element);
            if (dataIndex.displayIndex !== -1) {
                DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].clear();
            }
            else {
                console.error('Display ' + element + ' does not exist. It can not be cleared.');
            }
        });
        res.send(DataClass_1.default.data);
    };
    DisplayController.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/:id', function (req, res) {
            _this.getDisplay(req, res);
        });
        this.router.get('/', function (req, res) {
            _this.getDisplays(req, res);
        });
        this.router.post('/', function (req, res) {
            _this.newDisplay(req, res);
        });
        this.router.put('/clear', function (req, res) {
            _this.clearDisplay(req, res);
        });
        this.router.put('/:id', function (req, res) {
            _this.updateDisplay(req, res);
        });
        this.router.put('/', function (req, res) {
            _this.updateDisplay(req, res);
        });
    };
    return DisplayController;
}());
exports.DisplayController = DisplayController;
exports.default = new DisplayController();
