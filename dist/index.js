"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var DisplayController_1 = require("./controllers/DisplayController");
var DataClass_1 = require("./DataClass");
var socketIo = require("socket.io");
var port = normalizePort(process.env.PORT || 4100);
var server = App_1.default.listen(port, function () {
    console.log('\x1b[40m' + ("Express listening on port " + port));
    DataClass_1.default.importConfig();
});
function normalizePort(val) {
    var portValue = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(portValue)) {
        return val;
    }
    else if (portValue >= 0) {
        return portValue;
    }
    else {
        return false;
    }
}
function sendAppStates(socket) {
    for (var _i = 0, _a = DataClass_1.default.data; _i < _a.length; _i++) {
        var room = _a[_i];
        room.timer.update();
        for (var _b = 0, _c = room.displays; _b < _c.length; _b++) {
            var display = _c[_b];
            if (display.active) {
                socket.to(display.socketId).emit('uiState', display);
            }
        }
    }
}
var io = socketIo(server);
io.on('connection', function (socket) {
    var parts = socket.handshake.headers.referer.split('/');
    var lastSegment = parts.pop() || parts.pop();
    DisplayController_1.default.addDisplay(lastSegment, socket.id);
    console.log('display connected: ' + lastSegment);
    socket.on('updateRemaining', function (timeremaining) {
        var dataIndex = DataClass_1.default.findSocketIdInConfig(socket.id);
        console.log('time remaining: ' + timeremaining);
        DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].media.remaining = timeremaining;
        console.log(DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].media.remaining);
        if (timeremaining === 0) {
            DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].media.headerVisible = true;
            DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].media.type = null;
            DataClass_1.default.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].media.url = null;
        }
    });
    socket.on('disconnect', function () {
        DisplayController_1.default.removeDisplay(lastSegment);
        console.log('display disconnected: ' + lastSegment);
    });
});
setInterval(sendAppStates, 1000, io);
