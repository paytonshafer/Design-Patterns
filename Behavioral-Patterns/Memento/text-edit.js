// The Originator
var TextFile = /** @class */ (function () {
    function TextFile(state) {
        this.state = state;
        console.log("TextFile: My text is: ".concat(state));
    }
    TextFile.prototype.write = function (new_text) {
        console.log('TextFile: Text is being updated.');
        this.state += new_text;
        console.log("TexFile: My text is now: ".concat(this.state));
    };
    TextFile.prototype.save = function () {
        return new TextFileHistory(this.state);
    };
    TextFile.prototype.restore = function (memento) {
        this.state = memento.getState();
        console.log("Originator: My state has changed to: ".concat(this.state));
    };
    return TextFile;
}());
// Concrete Memento
var TextFileHistory = /** @class */ (function () {
    function TextFileHistory(state) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    TextFileHistory.prototype.getState = function () {
        return this.state;
    };
    TextFileHistory.prototype.getName = function () {
        return "".concat(this.date, " / (").concat(this.state.slice(-9), "...)");
    };
    TextFileHistory.prototype.getDate = function () {
        return this.date;
    };
    return TextFileHistory;
}());
// Caretaker
var TextEditor = /** @class */ (function () {
    function TextEditor(textfile) {
        this.history = [];
        this.textfile = textfile;
    }
    TextEditor.prototype.save = function () {
        console.log('\nText Editor: Saving Text File ...');
        this.history.push(this.textfile.save());
    };
    TextEditor.prototype.undo = function () {
        if (!this.history.length) {
            return;
        }
        var memento = this.history.pop();
        if (memento) {
            console.log("Text Editor: Restoring state to: ".concat(memento.getName()));
            this.textfile.restore(memento);
        }
    };
    TextEditor.prototype.showHistory = function () {
        console.log('Text Editor: Here\'s the list of history:');
        for (var _i = 0, _a = this.history; _i < _a.length; _i++) {
            var memento = _a[_i];
            console.log(memento.getName());
        }
    };
    return TextEditor;
}());
// Client code
var file = new TextFile('Hello World! ');
var editor = new TextEditor(file);
editor.save();
file.write('I love ');
editor.save();
file.write('learning ');
editor.save();
file.write('Design Patterns!');
editor.save();
console.log('');
editor.showHistory();
console.log('\nClient: Now, let\'s rollback!\n');
editor.undo();
console.log('\nClient: Once more!\n');
editor.undo();
console.log('\nClient: Back to Original!\n');
editor.undo();
/* OUTPUT

*/ 
