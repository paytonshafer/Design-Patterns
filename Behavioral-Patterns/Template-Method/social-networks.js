"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
// Readline package
var readline = require("readline");
// Readline config
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Function to get and store user input to a variable
var questionAsync = function (prompt) {
    return new Promise(function (resolve) {
        rl.question(prompt, resolve);
    });
};
// Base Class w Template method
var Network = /** @class */ (function () {
    function Network() {
    }
    // Template method
    Network.prototype.post = function (msg) {
        if (this.login(this.username, this.password)) {
            var result = this.sendData(msg);
            this.logOut();
            return result;
        }
        return false;
    };
    return Network;
}());
// Concrete class for Twitter
var Twitter = /** @class */ (function (_super) {
    __extends(Twitter, _super);
    function Twitter(username, password) {
        var _this = _super.call(this) || this;
        _this.username = username;
        _this.password = password;
        return _this;
    }
    Twitter.prototype.login = function (userName, password) {
        console.log('Checking user credentials ...');
        console.log('Username: ' + userName);
        var pswd = '';
        for (var i = 0; i < password.length; i++) {
            pswd += '*';
        }
        console.log('Password: ' + pswd);
        console.log('...........\n');
        console.log('Twitter login success.');
        return true;
    };
    Twitter.prototype.sendData = function (data) {
        console.log("Message: '".concat(data, "' was posted by ").concat(this.username));
        return true;
    };
    Twitter.prototype.logOut = function () {
        console.log("User: '".concat(this.username, "' was logged out from twitter."));
    };
    return Twitter;
}(Network));
// Concrete class for Facebook
var Facebook = /** @class */ (function (_super) {
    __extends(Facebook, _super);
    function Facebook(username, password) {
        var _this = _super.call(this) || this;
        _this.username = username;
        _this.password = password;
        return _this;
    }
    Facebook.prototype.login = function (userName, password) {
        console.log('Checking user credentials ...');
        console.log('Username: ' + userName);
        var pswd = '';
        for (var i = 0; i < password.length; i++) {
            pswd += '*';
        }
        console.log('Password: ' + pswd);
        console.log('...........\n');
        console.log('Facebook login success.');
        return true;
    };
    Facebook.prototype.sendData = function (data) {
        console.log("Message: '".concat(data, "' was posted by ").concat(this.username));
        return true;
    };
    Facebook.prototype.logOut = function () {
        console.log("User: '".concat(this.username, "' was logged out from Facebook."));
    };
    return Facebook;
}(Network));
// Client code
var client = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, pswd, msg, network;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, questionAsync('Enter username: ')];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, questionAsync('Enter password: ')];
            case 2:
                pswd = _a.sent();
                return [4 /*yield*/, questionAsync('Enter your message: ')];
            case 3:
                msg = _a.sent();
                rl.question('Choose a social network to post to:\n1. Twitter\n2. Facebook\n', function (num) {
                    if (num == '1') {
                        network = new Twitter(user, pswd);
                    }
                    else {
                        network = new Facebook(user, pswd);
                    }
                    network.post(msg);
                    console.log('Enter ^c to quit, Thank you!');
                });
                return [2 /*return*/];
        }
    });
}); };
client();
