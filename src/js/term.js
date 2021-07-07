"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var user = "";
var pass = "";
window.onload = function () {
    document.getElementsByTagName("returnbutton")[0].addEventListener("click", function () {
        location.href = "index.html";
    });
    document.getElementsByTagName("input")[0].addEventListener("keyup", function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            codelogicterm();
        }
    });
    document.getElementsByTagName("enterinput")[0].addEventListener("click", function () {
        codelogicterm();
    });
    writeconsole(" ", "green");
    writeconsole(" ", "green");
    writeconsole("Use 'logon &lt;username&gt; &lt;password&gt;' to login to the terminal.", "green");
};
var writeconsole = function (text, color) { return __awaiter(void 0, void 0, void 0, function () {
    var consolehold;
    return __generator(this, function (_a) {
        consolehold = document.getElementById("consolehold");
        if (consolehold !== null) {
            consolehold.innerHTML += "<p style=\"color:" + color + "; width: 100%;\">" + text.replace("<", '&lt;').replace(">", '&gt;') + "</p>";
            consolehold.children[consolehold.children.length - 1].scrollIntoView();
        }
        return [2 /*return*/];
    });
}); };
var codelogicterm = function () { return __awaiter(void 0, void 0, void 0, function () {
    var usercmd;
    return __generator(this, function (_a) {
        usercmd = document.getElementsByTagName("input")[0].value;
        writeconsole("$ " + usercmd, "green");
        document.getElementsByTagName("input")[0].value = "";
        if (usercmd.split(" ")[0] == "logon" && usercmd.split(" ")[1] !== undefined && usercmd.split(" ")[2] !== undefined) {
            user = usercmd.split(" ")[1];
            pass = usercmd.split(" ")[2];
            logicreq(user + ":" + pass);
        }
        else {
            logicreq(usercmd);
        }
        return [2 /*return*/];
    });
}); };
var logicreq = function (cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var json, msgraw, msg, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                json = JSON.stringify({
                    user: user,
                    pass: pass,
                    input: cmd,
                    location: "/"
                });
                console.log(json);
                return [4 /*yield*/, reqterm("https://hermatrix.net/submitConsole", json)];
            case 1:
                msgraw = _a.sent();
                if (msgraw !== undefined) {
                    msg = JSON.parse(msgraw);
                    for (i = 0; i < msg.data.length; i++) {
                        writeconsole(msg.data[i].content, msg.data[i].color);
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
var reqterm = function (url, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var Http = new XMLHttpRequest();
                Http.open("POST", url, true);
                Http.setRequestHeader("Content-type", "application/json");
                Http.send(data);
                Http.onreadystatechange = function () {
                    if (Http.readyState == 4 && Http.status == 200) {
                        resolve(Http.responseText);
                    }
                    else if (Http.readyState == 4 && Http.status == 401) {
                        resolve('{"data":[{"new":false,"color":"pink","content":"Authentication Failed!"}],"location":"/"}');
                    }
                    else if (Http.readyState == 4 && Http.status != 200 && Http.status != 401) {
                        resolve(undefined);
                    }
                };
            })];
    });
}); };
