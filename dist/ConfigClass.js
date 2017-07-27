"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = (function () {
    function Config() {
    }
    Config.importConfig = function () {
        var fs = require('fs');
        fs.readFile('config.json', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            Config.config = JSON.parse(data);
            console.log(Config.config);
            console.log(Config.config[0].displays[0].friendlyName);
        });
    };
    Config.findDisplayInConfig = function (DisplayId) {
        for (var room in Config.config) {
            if (Config.config.hasOwnProperty(room)) {
                for (var i = 0; i < Config.config[room].displays.length; i++) {
                    if (Config.config[room].displays[i].displayId === DisplayId) {
                        console.log('Found Room in ' + room + ', ' + i);
                        return {
                            displayIndex: i,
                            roomIndex: room,
                        };
                    }
                }
            }
        }
    };
    return Config;
}());
exports.default = Config;
