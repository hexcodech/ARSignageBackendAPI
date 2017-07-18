"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var port = normalizePort(process.env.PORT || 4100);
var server = App_1.default.listen(port, function () {
    console.log("Express listening on port " + port);
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
