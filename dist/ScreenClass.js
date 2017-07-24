"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Screen = (function () {
    function Screen(id, ip) {
        var _this = this;
        this.displayId = 'default';
        this.test = 'test';
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
        console.log('New Screen with id ' + id + ' created.');
        Screen.totalScreens = Screen.screens.length + 1;
        console.log('There are now ' + Screen.totalScreens + ' Screens registered');
    }
    Screen.prototype.clear = function () {
        this.media.headerVisible = null;
        this.media.text = null;
        this.media.type = null;
        this.media.url = null;
        console.log('Screen ' + this.displayId + ' has been cleared.');
    };
    Screen.screens = new Array();
    Screen.totalScreens = 0;
    return Screen;
}());
exports.default = Screen;
