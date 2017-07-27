"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data = (function () {
    function Data() {
    }
    Data.importConfig = function () {
        var fs = require('fs');
        fs.readFile('config.json', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            Data.data = JSON.parse(data);
            console.log(Data.data);
        });
    };
    Data.findDisplayInConfig = function (DisplayId) {
        for (var room = 0; room < Data.data.length; room++) {
            for (var display = 0; display < Data.data[room].displays.length; display++) {
                if (Data.data[room].displays[display].displayId === DisplayId) {
                    console.log('Found Room in ' + room + ', ' + display);
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
    return Data;
}());
exports.default = Data;
