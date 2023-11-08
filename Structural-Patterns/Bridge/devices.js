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
// First concrete implementation is a radio
var Radio = /** @class */ (function () {
    function Radio() {
        this.on = false;
        this.volume = 30;
        this.channel = 1;
    }
    Radio.prototype.isOn = function () {
        return this.on;
    };
    Radio.prototype.start = function () {
        this.on = true;
    };
    Radio.prototype.stop = function () {
        this.on = false;
    };
    Radio.prototype.getVolume = function () {
        return this.volume;
    };
    Radio.prototype.setVolume = function (vol) {
        if (vol <= 100 && vol >= 0) {
            this.volume = vol;
        }
        else if (vol > 100) {
            this.volume = 100;
        }
        else {
            this.volume = 0;
        }
    };
    Radio.prototype.getChannel = function () {
        return this.channel;
    };
    Radio.prototype.setChannel = function (num) {
        if (num < 1) {
            this.channel = 1;
        }
        else {
            this.channel = num;
        }
    };
    Radio.prototype.status = function () {
        var info = "";
        info += "------------------------------------\n";
        info += "| I'm a radio.\n";
        info += "| I'm ".concat(this.on ? "enabled\n" : "disabled\n");
        info += "| Current volume is " + this.volume + "/100\n";
        info += "| Current channel is " + this.channel;
        info += "\n------------------------------------\n";
        console.log(info);
    };
    return Radio;
}());
// Second concrete implementation is a TV
var TV = /** @class */ (function () {
    function TV() {
        this.on = false;
        this.volume = 30;
        this.channel = 1;
    }
    TV.prototype.isOn = function () {
        return this.on;
    };
    TV.prototype.start = function () {
        this.on = true;
    };
    TV.prototype.stop = function () {
        this.on = false;
    };
    TV.prototype.getVolume = function () {
        return this.volume;
    };
    TV.prototype.setVolume = function (vol) {
        if (vol <= 100 && vol >= 0) {
            this.volume = vol;
        }
        else if (vol > 100) {
            this.volume = 100;
        }
        else {
            this.volume = 0;
        }
    };
    TV.prototype.getChannel = function () {
        return this.channel;
    };
    TV.prototype.setChannel = function (num) {
        if (num < 1) {
            this.channel = 1;
        }
        else {
            this.channel = num;
        }
    };
    TV.prototype.status = function () {
        var info = "";
        info += "------------------------------------\n";
        info += "| I'm a tv.\n";
        info += "| I'm ".concat(this.on ? "enabled\n" : "disabled\n");
        info += "| Current volume is " + this.volume + "/100\n";
        info += "| Current channel is " + this.channel;
        info += "\n------------------------------------\n";
        console.log(info);
    };
    return TV;
}());
var BasicRemote = /** @class */ (function () {
    function BasicRemote(device) {
        this.device = device;
    }
    BasicRemote.prototype.power = function () {
        console.log('Remote: power toggle');
        if (this.device.isOn()) {
            this.device.stop();
        }
        else {
            this.device.start();
        }
    };
    BasicRemote.prototype.volumeDown = function () {
        console.log('Remote: volume down');
        this.device.setVolume(this.device.getVolume() - 10);
    };
    BasicRemote.prototype.volumeUp = function () {
        console.log('Remote: volume up');
        this.device.setVolume(this.device.getVolume() + 10);
    };
    BasicRemote.prototype.channelDown = function () {
        console.log('Remote: channel down');
        this.device.setChannel(this.device.getChannel() - 1);
    };
    BasicRemote.prototype.channelUp = function () {
        console.log('Remote: channel up');
        this.device.setChannel(this.device.getChannel() + 1);
    };
    return BasicRemote;
}());
// Advanced remote is a variation of remote with extra features
var AdvancedRemote = /** @class */ (function (_super) {
    __extends(AdvancedRemote, _super);
    function AdvancedRemote(device) {
        return _super.call(this, device) || this;
    }
    AdvancedRemote.prototype.mute = function () {
        console.log("Remote: mute");
        this.device.setVolume(0);
    };
    return AdvancedRemote;
}(BasicRemote));
function testDevice(device) {
    var basicRemote = new BasicRemote(device);
    basicRemote.power();
    basicRemote.channelUp();
    basicRemote.channelUp();
    basicRemote.channelUp();
    basicRemote.volumeUp();
    basicRemote.power();
    device.status();
    var advRemote = new AdvancedRemote(device);
    advRemote.power();
    advRemote.channelUp();
    advRemote.mute();
    device.status();
}
testDevice(new Radio);
testDevice(new TV);
