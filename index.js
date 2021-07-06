"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var createWindow = function () {
    var window = new electron_1.BrowserWindow({
        width: 800,
        height: 600
    });
    window.loadFile('index.html');
};
electron_1.app.whenReady().then(function () {
    createWindow();
});
