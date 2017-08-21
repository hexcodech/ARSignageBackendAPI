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
        console.log('body');
        console.log(req.body);
        var timer = req.body.timer;
        var roomIndex = DataClass_1.default.findRoomInConfig(req.body.timer.roomId);
        if (typeof req.body.timer.running !== undefined) {
            DataClass_1.default.data[roomIndex].timer.running = req.body.timer.running;
            if (DataClass_1.default.data[roomIndex].timer.seconds) {
                DataClass_1.default.data[roomIndex].timer.endTime = DataClass_1.default.data[roomIndex].timer.seconds + Math.floor(Date.now() / 1000);
            }
        }
        if (req.body.timer.seconds) {
            DataClass_1.default.data[roomIndex].timer.seconds = req.body.timer.seconds;
        }
        DataClass_1.default.data[roomIndex].timer.update();
        var todo = req.body.rooms;
        var time = req.body.time;
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
