"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = (function () {
    function Room(roomId) {
        this.displays = new Array();
        this.roomId = roomId;
    }
    Room.rooms = new Array();
    return Room;
}());
exports.default = Room;
