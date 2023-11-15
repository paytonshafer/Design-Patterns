// The Command interface declars the method for executing a cmd.
interface Command {
    execute(): void;
}

// Some commands may just implements simple operations on their own.
class SimpleCommand implements Command {
    private payload: string;

    constructor(payload: string) {
        this.payload = payload;
    }

    public execute(): void {
        console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
    }
}

// While some commands delegate their work to the Reciever
class ComplexCommand implements Command {
    private receiver: Receiver;

    // Context data
    private a: string;

    private b: string;

    // Complex commands accept the reciever object and context data
    constructor(receiver: Receiver, a: string, b: string) {
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }

    // Commands are able to delegate to any method of the receiver
    public execute(): void {
        console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}

// The Receiver classes contain some important business logic.
class Receiver {
    public doSomething(a: string): void {
        console.log(`Receiver: Working on (${a}.)`);
    }

    public doSomethingElse(b: string): void {
        console.log(`Receiver: Also working on (${b}.)`);
    }
}

// The Invoker is associated with commands and delgates work to them
class Invoker {
    private onStart: Command;

    private onFinish: Command;

    // Initialize commands for start and finish
    public setOnStart(command: Command): void {
        this.onStart = command;
    }

    public setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    // Invoker passes requests indirectly through commands
    public doSomethingImportant(): void {
        console.log('Invoker: Does anybody want something done before I begin?');
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }

        console.log('\nInvoker: ...doing something really important...\n');

        console.log('Invoker: Does anybody want something done after I finish?');
        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
    }

    private isCommand(object): object is Command {
        return object.execute !== undefined;
    }
}

// Client code
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Printed Message'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Task one', 'Task two'));

invoker.doSomethingImportant();

/* OUTPUT
Invoker: Does anybody want something done before I begin?
SimpleCommand: See, I can do simple things like printing (Printed Message)

Invoker: ...doing something really important...

Invoker: Does anybody want something done after I finish?
ComplexCommand: Complex stuff should be done by a receiver object.
Receiver: Working on (Task one.)
Receiver: Also working on (Task two.)
*/