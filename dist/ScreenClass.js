"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Screen = (function () {
    function Screen(screenId) {
        this.screenId = screenId;
        this.id = 'default';
        this.test = 'test';
        console.log('id ' + screenId);
        this.id = screenId;
    }
    Screen.screens = new Array();
    Screen.totalScreens = 0;
    return Screen;
}());
exports.default = Screen;
