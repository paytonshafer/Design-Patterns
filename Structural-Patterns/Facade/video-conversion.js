var VideoFile = /** @class */ (function () {
    function VideoFile(name) {
        this.name = name;
        this.codecType = name.substring(name.indexOf(".") + 1);
    }
    VideoFile.prototype.getCodecType = function () {
        return this.codecType;
    };
    VideoFile.prototype.getName = function () {
        return this.name;
    };
    return VideoFile;
}());
var MPEG4CompressionCodec = /** @class */ (function () {
    function MPEG4CompressionCodec() {
        this.type = "mp4";
    }
    return MPEG4CompressionCodec;
}());
var OggCompressionCodec = /** @class */ (function () {
    function OggCompressionCodec() {
        this.type = "ogg";
    }
    return OggCompressionCodec;
}());
var CodecFactory = /** @class */ (function () {
    function CodecFactory() {
    }
    CodecFactory.extract = function (file) {
        var type = file.getCodecType();
        if (type == "mp4") {
            console.log("CodecFactory: extracting mpeg audio...");
            return new MPEG4CompressionCodec();
        }
        else {
            console.log("CodecFactory: extracting ogg audio...");
            return new OggCompressionCodec();
        }
    };
    return CodecFactory;
}());
var BitrateReader = /** @class */ (function () {
    function BitrateReader() {
    }
    BitrateReader.read = function (file, codec) {
        console.log("BitrateReader: reading file...");
        return file;
    };
    BitrateReader.convert = function (buffer, codec) {
        console.log("BitrateReader: writing file...");
        return new VideoFile(buffer.getName().slice(0, -4) + "." + codec.type);
    };
    return BitrateReader;
}());
var AudioMixer = /** @class */ (function () {
    function AudioMixer() {
    }
    AudioMixer.prototype.fix = function (result) {
        console.log("AudioMixer: fixing audio...");
        return result;
    };
    return AudioMixer;
}());
// Facade
var VideoConversionFacade = /** @class */ (function () {
    function VideoConversionFacade() {
    }
    VideoConversionFacade.prototype.convertVideo = function (fileName, format) {
        console.log("VideoConversionFacade: conversion started.");
        var file = new VideoFile(fileName);
        var sourceCodec = CodecFactory.extract(file);
        var destinationCodec;
        if (format == "mp4") {
            destinationCodec = new MPEG4CompressionCodec();
        }
        else {
            destinationCodec = new OggCompressionCodec();
        }
        var buffer = BitrateReader.read(file, sourceCodec);
        var intermediateResult = BitrateReader.convert(buffer, destinationCodec);
        var result = (new AudioMixer()).fix(intermediateResult);
        console.log("VideoConversionFacade: conversion completed.");
        return result;
    };
    return VideoConversionFacade;
}());
var converter = new VideoConversionFacade();
console.log("Input:");
console.log(new VideoFile("youtubevideo.ogg"));
console.log();
var converted = converter.convertVideo("youtubevideo.ogg", "mp4");
console.log("\nResult:");
console.log(converted);
