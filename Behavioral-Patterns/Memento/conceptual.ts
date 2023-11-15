/**
 * The Originator holds the important state that changes over time. There is also
 * methods for saving the state in a mememto and restoring the state from it.
 */
class Originator {
    // The orignintor state is stored in single variable here
    private state: string;

    constructor(state: string) {
        this.state = state;
        console.log(`Originator: My initial state is: ${state}`);
    }

    // The Originator have logic they may change the internal state, client should use save to have a backup before this operation
    public doSomething(): void {
        console.log('Originator: I\'m doing something important.');
        this.state = this.generateRandomString(30);
        console.log(`Originator: and my state has changed to: ${this.state}`);
    }

    private generateRandomString(length: number = 10): string {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return Array
            .apply(null, { length })
            .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
            .join('');
    }

    // Save state in a memento
    public save(): Memento {
        return new ConcreteMemento(this.state);
    }

    // Restore state from memento object
    public restore(memento: Memento): void {
        this.state = memento.getState();
        console.log(`Originator: My state has changed to: ${this.state}`);
    }
}

// Memento interface allows retreival of mementos data without exposing Originator's state.
interface Memento {
    getState(): string;

    getName(): string;

    getDate(): string;
}

// Concrete Memento implements methods for storing the state
class ConcreteMemento implements Memento {
    private state: string;

    private date: string;

    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    // Orginator uses this method to restore a state
    public getState(): string {
        return this.state;
    }

    // Below methods are for caretaker to display data
    public getName(): string {
        return `${this.date} / (${this.state.slice(0, 9)}...)`;
    }

    public getDate(): string {
        return this.date;
    }
}

/**
 * Caretaker only works with the memento interface this it won't have access to the originators state.
 */
class Caretaker {
    private mementos: Memento[] = [];

    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator;
    }

    public backup(): void {
        console.log('\nCaretaker: Saving Originator\'s state...');
        this.mementos.push(this.originator.save());
    }

    public undo(): void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        if(memento){
            console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
            this.originator.restore(memento);
        }
    }

    public showHistory(): void {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}

// Client code
const originator = new Originator('Hello World');
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('');
caretaker.showHistory();

console.log('\nClient: Now, let\'s rollback!\n');
caretaker.undo();

console.log('\nClient: Once more!\n');
caretaker.undo();

console.log('\nClient: Back to Original!\n');
caretaker.undo();

/* OUTPUT
Originator: My initial state is: Hello World

Caretaker: Saving Originator's state...
Originator: I'm doing something important.
Originator: and my state has changed to: kRrKkHfNAiJLbeoKofWjiVHhSvroxr

Caretaker: Saving Originator's state...
Originator: I'm doing something important.
Originator: and my state has changed to: aPgRxluavLrcXFmbioYLywTiTJgcXV

Caretaker: Saving Originator's state...
Originator: I'm doing something important.
Originator: and my state has changed to: MrDuHsuVFYhXvlZIupqHGBJBOFkGFp

Caretaker: Here's the list of mementos:
2023-11-14 17:56:05 / (Hello Wor...)
2023-11-14 17:56:05 / (kRrKkHfNA...)
2023-11-14 17:56:05 / (aPgRxluav...)

Client: Now, let's rollback!

Caretaker: Restoring state to: 2023-11-14 17:56:05 / (aPgRxluav...)
Originator: My state has changed to: aPgRxluavLrcXFmbioYLywTiTJgcXV

Client: Once more!

Caretaker: Restoring state to: 2023-11-14 17:56:05 / (kRrKkHfNA...)
Originator: My state has changed to: kRrKkHfNAiJLbeoKofWjiVHhSvroxr

Client: Back to Original!

Caretaker: Restoring state to: 2023-11-14 17:56:05 / (Hello Wor...)
Originator: My state has changed to: Hello World
*/