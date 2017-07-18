"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Screen = (function () {
    function Screen(theName) {
        this.theName = theName;
        this.id = 'default';
        this.test = 'test';
        this.test = 'after constructor';
    }
    Screen.screens = new Array();
    Screen.totalScreens = 0;
    return Screen;
}());
exports.default = Screen;
