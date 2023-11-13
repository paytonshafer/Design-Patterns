// The Command interface
interface Command {
    execute(text: string): void;
}

// Concrete command to copy text
class Copy implements Command {
    private clipboard: TextClipboard;

    constructor(clipboard: TextClipboard) {
        this.clipboard = clipboard;
    }

    public execute(text: string): void {
        this.clipboard.copy(text)
    }
}

// Concrete command to paste text
class Paste implements Command {
    private clipboard: TextClipboard;

    constructor(clipboard: TextClipboard) {
        this.clipboard = clipboard;
    }

    public execute(): void {
        this.clipboard.paste()
    }
}

class TextClipboard {
    private data: string;

    public copy(text: string): void {
        console.log(`Clipboard: Copying ...`);
        this.data = text
    }

    public paste(): void {
        console.log(`Clipboard: Pasting ... \n${this.data}`);
    }
}


// Client code
const clipboard = new TextClipboard()
let copy = new Copy(clipboard)
let paste = new Paste(clipboard)
console.log('Enter text to copy: Hello World!')
copy.execute('Hello World!')
paste.execute()

/* OUTPUT
Enter text to copy: Hello World!
Clipboard: Copying ...
Clipboard: Pasting ... 
Hello World!
*/