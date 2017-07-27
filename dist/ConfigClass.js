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
            Config.findDisplayInConfig('ar2-room2');
        });
    };
    Config.findDisplayInConfig = function (DisplayId) {
        for (var room in Config.config) {
            if (Config.config.hasOwnProperty(room)) {
                for (var i = 0; i < Config.config[room].screens.length; i++) {
                    if (Config.config[room].screens[i].displayId === DisplayId) {
                        console.log('Found Room in ' + room + ', ' + i);
                        return {
                            displayId: i,
                            roomId: room,
                        };
                    }
                }
            }
        }
    };
    return Config;
}());
exports.default = Config;
