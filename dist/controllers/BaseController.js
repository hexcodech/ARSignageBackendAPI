"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DataClass_1 = require("../DataClass");
var BaseController = (function () {
    function BaseController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    BaseController.prototype.default = function (req, res) {
        res.json({
            message: 'Hello World',
        });
    };
    BaseController.prototype.setTimer = function (req, res) {
        var todo = req.body.rooms;
        var time = req.body.time;
        todo.forEach(function (element) {
            var roomIndex = DataClass_1.default.findRoomInConfig(element.roomId);
            if (roomIndex !== -1 && DataClass_1.default.data[roomIndex].hasOwnProperty('timer')) {
                var endTime = Math.floor(Date.now() / 1000) + time;
                DataClass_1.default.data[roomIndex].timer.endTime = endTime;
                DataClass_1.default.data[roomIndex].timer.running = true;
                DataClass_1.default.data[roomIndex].timer.update();
            }
            else {
                console.error('Room ' + element.roomId + ' does not exit. Timer can not be set.');
            }
        });
        res.send(DataClass_1.default.data);
    };
    BaseController.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/', this.default);
        this.router.put('/timer', function (req, res) {
            _this.setTimer(req, res);
        });
    };
    return BaseController;
}());
exports.BaseController = BaseController;
exports.default = new BaseController();
