"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataClass_1 = require("./DataClass");
var Display = (function () {
    function Display(displayId, friendlyName) {
        var _this = this;
        this.active = false;
        this.timer = {
            endTime: null,
            running: null,
            seconds: 0,
            update: function () {
                console.log('timer update in Display not allowed');
                DataClass_1.default.data[DataClass_1.default.findDisplayInConfig(_this.displayId).roomIndex].timer.update();
            },
        };
        this.media = {
            headerVisible: true,
            remaining: null,
            text: null,
            type: null,
            url: null,
        };
        this.displayId = displayId;
        this.friendlyName = friendlyName;
        console.log('New Display with id ' + displayId + ' created.');
    }
    Display.prototype.clear = function () {
        this.media.headerVisible = true;
        this.media.text = null;
        this.media.type = null;
        this.media.url = null;
        console.log('Display ' + this.displayId + ' has been cleared.');
    };
    return Display;
}());
exports.default = Display;
