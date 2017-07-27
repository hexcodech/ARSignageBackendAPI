"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Display = (function () {
    function Display(id, ip) {
        var _this = this;
        this.active = false;
        this.timer = {
            endTime: null,
            running: null,
            seconds: null,
            update: function () {
                if (_this.timer.endTime !== null) {
                    _this.timer.seconds = _this.timer.endTime - Math.floor(Date.now() / 1000);
                }
                else {
                    _this.timer.seconds = 0;
                }
            },
        };
        this.media = {
            headerVisible: true,
            text: null,
            type: null,
            url: null,
        };
        this.displayId = id;
        this.ip = ip;
        console.log('New Display with id ' + id + ' created.');
        Display.totalDisplays = Display.displays.length + 1;
        console.log('There are now ' + Display.totalDisplays + ' Displays registered');
    }
    Display.prototype.clear = function () {
        this.media.headerVisible = null;
        this.media.text = null;
        this.media.type = null;
        this.media.url = null;
        console.log('Display ' + this.displayId + ' has been cleared.');
    };
    Display.displays = new Array();
    Display.totalDisplays = 0;
    return Display;
}());
exports.default = Display;
