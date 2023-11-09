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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Concrete Conponenent
var FileDataSource = /** @class */ (function () {
    function FileDataSource(name) {
        this.name = name;
    }
    FileDataSource.prototype.writeData = function (data) {
        try {
            fs.writeFileSync(this.name, data, 'utf8');
        }
        catch (ex) {
            console.log(ex.message);
        }
    };
    FileDataSource.prototype.readData = function () {
        try {
            var buffer = fs.readFileSync(this.name, 'utf8');
            return buffer;
        }
        catch (ex) {
            console.log(ex.message);
            return '';
        }
    };
    return FileDataSource;
}());
// Base Decorator
var DataSourceDecorator = /** @class */ (function () {
    function DataSourceDecorator(src) {
        this.wrappee = src;
    }
    DataSourceDecorator.prototype.writeData = function (data) {
        this.wrappee.writeData(data);
    };
    DataSourceDecorator.prototype.readData = function () {
        return this.wrappee.readData();
    };
    return DataSourceDecorator;
}());
// Concrete Decorator for Encryption
var EncryptionDecorator = /** @class */ (function (_super) {
    __extends(EncryptionDecorator, _super);
    function EncryptionDecorator(src) {
        return _super.call(this, src) || this;
    }
    EncryptionDecorator.prototype.writeData = function (data) {
        _super.prototype.writeData.call(this, this.encode(data));
    };
    EncryptionDecorator.prototype.readData = function () {
        return this.decode(_super.prototype.readData.call(this));
    };
    EncryptionDecorator.prototype.encode = function (data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            result.push(data.charCodeAt(i) + 1);
        }
        var encoded = String.fromCharCode.apply(String, result);
        return btoa(encoded);
    };
    EncryptionDecorator.prototype.decode = function (data) {
        var decoded = atob(data);
        var result = [];
        for (var i = 0; i < decoded.length; i++) {
            result.push(decoded.charCodeAt(i) - 1);
        }
        return String.fromCharCode.apply(String, result);
    };
    return EncryptionDecorator;
}(DataSourceDecorator));
// Client funcitons
var writeSensitiveData = function (name, data) {
    var file = new FileDataSource(name);
    var e = new EncryptionDecorator(file);
    e.writeData(data);
};
var writeUnsensitiveData = function (name, data) {
    var file = new FileDataSource(name);
    file.writeData(data);
};
var readSensitiveData = function (file) {
    var test = new FileDataSource(file);
    var d = new EncryptionDecorator(test);
    console.log(d.readData());
};
var readUnsensitiveData = function (name) {
    var file = new FileDataSource(name);
    console.log(file.readData());
};
console.log("Writing public data to 'safe.txt'. Open the file to read it.");
writeUnsensitiveData('data/safe.txt', 'Hello this is public data for anyone with the file to read!');
console.log("Reading public data from 'safe.txt'. It is already human readable.");
readUnsensitiveData('data/safe.txt');
console.log();
console.log("Writing secret data to 'secrets.txt'. Open the file to see the encoded message.");
writeSensitiveData('data/secrets.txt', 'Hello this is secret data, but even if you get the file it is encoded');
console.log("Reading secret data from 'secrets.txt'. The data must be decoded before it is human readable.");
readSensitiveData('data/secrets.txt');
/* OUTPUT
Writing public data to 'safe.txt'. Open the file to read it.
*FROM FILE: Hello this is public data for anyone with the file to read!*
Reading public data from 'safe.txt'. It is already human readable.
Hello this is public data for anyone with the file to read!

Writing secret data to 'secrets.txt'. Open the file to see the encoded message.
*FROM FILE: SWZtbXAhdWlqdCFqdCF0ZmRzZnUhZWJ1Yi0hY3Z1IWZ3Zm8hamchenB2IWhmdSF1aWYhZ2ptZiFqdSFqdCFmb2RwZWZl*
Reading secret data from 'secrets.txt'. The data must be decoded before it is human readable.
Hello this is secret data, but even if you get the file it is encoded
*/ 
