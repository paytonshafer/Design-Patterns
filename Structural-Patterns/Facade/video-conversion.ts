// Part of Complex Subsystem
class VideoFile {
    private name: string;
    private codecType: string;

    public constructor(name: string) {
        this.name = name;
        this.codecType = name.substring(name.indexOf(".") + 1);
    }

    public getCodecType(): string {
        return this.codecType;
    }

    public getName(): string {
        return this.name;
    }
}

// Part of Complex Subsystem
interface Codec {
    type: string;
}

// Part of Complex Subsystem
class MPEG4CompressionCodec implements Codec {
    public type: string = "mp4";
}

// Part of Complex Subsystem
class OggCompressionCodec implements Codec {
    public type: string = "ogg";
}

// Part of Complex Subsystem
class CodecFactory {
    public static extract(file: VideoFile): Codec {
        let type = file.getCodecType();
        if (type == "mp4") {
            console.log("CodecFactory: extracting mpeg audio...");
            return new MPEG4CompressionCodec();
        }
        else {
            console.log("CodecFactory: extracting ogg audio...");
            return new OggCompressionCodec();
        }
    }
}

// Part of Complex Subsystem
class BitrateReader {
    public static read(file: VideoFile, codec: Codec): VideoFile {
        console.log("BitrateReader: reading file...");
        return file;
    }

    public static  convert(buffer: VideoFile, codec: Codec): VideoFile {
        console.log("BitrateReader: writing file...");
        return new VideoFile(buffer.getName().slice(0,-4) + "." + codec.type);
    }
}

// Part of Complex Subsystem
class AudioMixer {
    public fix(result: VideoFile): VideoFile{
        console.log("AudioMixer: fixing audio...");
        return result;
    }
}

// Facade
class VideoConversionFacade {
    public convertVideo(fileName: string , format: string): VideoFile {
        console.log("VideoConversionFacade: conversion started.");
        let file = new VideoFile(fileName);
        let sourceCodec = CodecFactory.extract(file);
        let destinationCodec;
        if (format == "mp4") {
            destinationCodec = new MPEG4CompressionCodec();
        } else {
            destinationCodec = new OggCompressionCodec();
        }
        let buffer = BitrateReader.read(file, sourceCodec);
        let intermediateResult = BitrateReader.convert(buffer, destinationCodec);
        let result = (new AudioMixer()).fix(intermediateResult);
        console.log("VideoConversionFacade: conversion completed.");
        return result;
    }
}

// Client code that works with the Facade
const converter = new VideoConversionFacade();
console.log("Input:")
console.log(new VideoFile("youtubevideo.ogg"))
console.log()
const converted = converter.convertVideo("youtubevideo.ogg", "mp4")
console.log("\nResult:")
console.log(converted)

/* OUTPUT
Input:
VideoFile { name: 'youtubevideo.ogg', codecType: 'ogg' }

VideoConversionFacade: conversion started.
CodecFactory: extracting ogg audio...
BitrateReader: reading file...
BitrateReader: writing file...
AudioMixer: fixing audio...
VideoConversionFacade: conversion completed.

Result:
VideoFile { name: 'youtubevideo.mp4', codecType: 'mp4' }
*/