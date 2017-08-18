"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mime = require("mime-types");
var MediaController = (function () {
    function MediaController() {
        this.router = express_1.Router();
        this.initRoutes();
    }
    MediaController.prototype.listAllFiles = function (req, res) {
        var dir = '/../../media';
        this.getFolders(dir, res);
    };
    MediaController.prototype.getFolders = function (dir, res) {
        var folderlist = new Array();
        var fs = require('fs');
        var folders = fs.readdirSync(__dirname + dir);
        folders.forEach(function (f) {
            folderlist.push(f);
        });
        this.getFiles(dir, folderlist, res);
    };
    MediaController.prototype.getFiles = function (dir, folderlist, res) {
        var filelist = new Array();
        var fs = require('fs');
        folderlist.forEach(function (folder) {
            var files = fs.readdirSync(__dirname + dir + '/' + folder);
            files.forEach(function (file) {
                filelist.push({ name: file, room: folder,
                    type: mime.lookup(__dirname + dir + '/' + folder + '/' + file) });
            });
        });
        res.send(filelist);
    };
    MediaController.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/', function (req, res) {
            _this.listAllFiles(req, res);
        });
    };
    return MediaController;
}());
exports.MediaController = MediaController;
exports.default = new MediaController();