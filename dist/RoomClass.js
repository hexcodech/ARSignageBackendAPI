"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-shim");
require("reflect-metadata");
var DisplayClass_1 = require("./DisplayClass");
var Room = (function () {
    function Room(roomId, firendlyName, displays) {
        var _this = this;
        this.displays = new Array();
        this.timer = {
            endTime: null,
            running: null,
            seconds: null,
            update: function () {
                if (_this.timer.endTime !== null && _this.timer.endTime - Math.floor(Date.now() / 1000) >= 0) {
                    _this.timer.seconds = _this.timer.endTime - Math.floor(Date.now() / 1000);
                }
                else {
                    _this.timer.seconds = null;
                    _this.timer.running = false;
                    _this.timer.endTime = null;
                }
                _this.displays.forEach(function (display) {
                    display.timer.endTime = _this.timer.endTime;
                    display.timer.running = _this.timer.running;
                    display.timer.seconds = _this.timer.seconds;
                });
            },
        };
        this.roomId = roomId;
        this.friendlyName = firendlyName;
        for (var _i = 0, displays_1 = displays; _i < displays_1.length; _i++) {
            var display = displays_1[_i];
            this.displays.push(new DisplayClass_1.default(display.displayId, display.friendlyName));
            this.timer.update();
        }
    }
    Room.rooms = new Array();
    return Room;
}());
exports.default = Room;
