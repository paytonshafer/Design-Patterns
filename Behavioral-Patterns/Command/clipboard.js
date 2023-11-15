// Concrete command to copy text
var Copy = /** @class */ (function () {
    function Copy(clipboard) {
        this.clipboard = clipboard;
    }
    Copy.prototype.execute = function (text) {
        this.clipboard.copy(text);
    };
    return Copy;
}());
// Concrete command to paste text
var Paste = /** @class */ (function () {
    function Paste(clipboard) {
        this.clipboard = clipboard;
    }
    Paste.prototype.execute = function () {
        this.clipboard.paste();
    };
    return Paste;
}());
var TextClipboard = /** @class */ (function () {
    function TextClipboard() {
    }
    TextClipboard.prototype.copy = function (text) {
        console.log("Clipboard: Copying ...");
        this.data = text;
    };
    TextClipboard.prototype.paste = function () {
        console.log("Clipboard: Pasting ... \n".concat(this.data));
    };
    return TextClipboard;
}());
// Client code
var clipboard = new TextClipboard();
var copy = new Copy(clipboard);
var paste = new Paste(clipboard);
console.log('Enter text to copy: Hello World!');
copy.execute('Hello World!');
paste.execute();
/* OUTPUT

*/ 
