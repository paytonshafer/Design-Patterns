// The Originator
class TextFile {
    private state: string;

    constructor(state: string) {
        this.state = state;
        console.log(`TextFile: My text is: ${state}`);
    }

    public write(new_text: string): void {
        console.log('TextFile: Text is being updated.');
        this.state += new_text
        console.log(`TexFile: My text is now: ${this.state}`);
    }

    public save(): Memento {
        return new TextFileHistory(this.state);
    }

    public restore(memento: Memento): void {
        this.state = memento.getState();
        console.log(`Originator: My state has changed to: ${this.state}`);
    }
}

// Memento interface 
interface Memento {
    getState(): string;

    getName(): string;

    getDate(): string;
}

// Concrete Memento
class TextFileHistory implements Memento {
    private state: string;

    private date: string;

    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    public getState(): string {
        return this.state;
    }

    public getName(): string {
        return `${this.date} / (${this.state.slice(-9)}...)`;
    }

    public getDate(): string {
        return this.date;
    }
}

// Caretaker
class TextEditor {
    private history: Memento[] = [];

    private textfile: TextFile;

    constructor(textfile: TextFile) {
        this.textfile = textfile;
    }

    public save(): void {
        console.log('\nText Editor: Saving Text File ...');
        this.history.push(this.textfile.save());
    }

    public undo(): void {
        if (!this.history.length) {
            return;
        }
        const memento = this.history.pop();

        if(memento){
            console.log(`Text Editor: Restoring state to: ${memento.getName()}`);
            this.textfile.restore(memento);
        }
    }

    public showHistory(): void {
        console.log('Text Editor: Here\'s the list of history:');
        for (const memento of this.history) {
            console.log(memento.getName());
        }
    }
}

// Client code
const file = new TextFile('Hello World! ');
const editor = new TextEditor(file);

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
TextFile: My text is: Hello World! 

Text Editor: Saving Text File ...
TextFile: Text is being updated.
TexFile: My text is now: Hello World! I love 

Text Editor: Saving Text File ...
TextFile: Text is being updated.
TexFile: My text is now: Hello World! I love learning 

Text Editor: Saving Text File ...
TextFile: Text is being updated.
TexFile: My text is now: Hello World! I love learning Design Patterns!

Text Editor: Saving Text File ...

Text Editor: Here's the list of history:
2023-11-14 18:07:19 / (o World! ...)
2023-11-14 18:07:19 / (! I love ...)
2023-11-14 18:07:19 / (learning ...)
2023-11-14 18:07:19 / (Patterns!...)

Client: Now, let's rollback!

Text Editor: Restoring state to: 2023-11-14 18:07:19 / (Patterns!...)
Originator: My state has changed to: Hello World! I love learning Design Patterns!

Client: Once more!

Text Editor: Restoring state to: 2023-11-14 18:07:19 / (learning ...)
Originator: My state has changed to: Hello World! I love learning 

Client: Back to Original!

Text Editor: Restoring state to: 2023-11-14 18:07:19 / (! I love ...)
Originator: My state has changed to: Hello World! I love 
*/