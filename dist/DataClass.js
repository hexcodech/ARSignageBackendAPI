"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-shim");
require("reflect-metadata");
var RoomClass_1 = require("./RoomClass");
var Data = (function () {
    function Data() {
    }
    Data.importConfig = function () {
        var _this = this;
        var fs = require('fs');
        fs.readFile('config.json', 'utf8', function (err, rawData) {
            if (err) {
                return console.log(err);
            }
            var tempdata = JSON.parse(rawData);
            _this.initializeData(tempdata);
            console.log(Data.data);
        });
    };
    Data.findDisplayInConfig = function (DisplayId) {
        for (var room = 0; room < Data.data.length; room++) {
            for (var display = 0; display < Data.data[room].displays.length; display++) {
                if (Data.data[room].displays[display].displayId === DisplayId) {
                    console.log('Found Display in ' + room + ', ' + display);
                    return {
                        displayIndex: display,
                        roomIndex: room,
                    };
                }
            }
        }
        return {
            displayIndex: -1,
            roomIndex: -1,
        };
    };
    Data.findSocketIdInConfig = function (socketId) {
        for (var room = 0; room < Data.data.length; room++) {
            for (var display = 0; display < Data.data[room].displays.length; display++) {
                if (Data.data[room].displays[display].socketId === socketId) {
                    console.log('Found Socket in ' + room + ', ' + display);
                    return {
                        displayIndex: display,
                        roomIndex: room,
                    };
                }
            }
        }
        return {
            displayIndex: -1,
            roomIndex: -1,
        };
    };
    Data.findRoomInConfig = function (RoomId) {
        for (var room = 0; room < Data.data.length; room++) {
            if (Data.data[room].roomId === RoomId) {
                console.log('Found Room in ' + room);
                return room;
            }
        }
        return -1;
    };
    Data.getmyIP = function () {
        var os = require('os');
        var ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function (ifname) {
            var alias = 0;
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    return;
                }
                if (alias >= 1) {
                    console.error('there are mutliple netzwork adapters');
                    console.log(ifname + ':' + alias, iface.address);
                }
                else {
                    console.log(ifname, iface.address);
                    Data.myIp = iface.address;
                }
                ++alias;
            });
        });
    };
    Data.initializeData = function (jsonData) {
        for (var _i = 0, jsonData_1 = jsonData; _i < jsonData_1.length; _i++) {
            var room = jsonData_1[_i];
            Data.data.push(new RoomClass_1.default(room.roomId, room.friendlyName, room.displays));
        }
        Data.getmyIP();
    };
    Data.data = new Array();
    return Data;
}());
exports.default = Data;
