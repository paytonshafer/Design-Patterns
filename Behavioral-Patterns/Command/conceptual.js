// Some commands may just implements simple operations on their own.
var SimpleCommand = /** @class */ (function () {
    function SimpleCommand(payload) {
        this.payload = payload;
    }
    SimpleCommand.prototype.execute = function () {
        console.log("SimpleCommand: See, I can do simple things like printing (".concat(this.payload, ")"));
    };
    return SimpleCommand;
}());
// While some commands delegate their work to the Reciever
var ComplexCommand = /** @class */ (function () {
    // Complex commands accept the reciever object and context data
    function ComplexCommand(receiver, a, b) {
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }
    // Commands are able to delegate to any method of the receiver
    ComplexCommand.prototype.execute = function () {
        console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    };
    return ComplexCommand;
}());
// The Receiver classes contain some important business logic.
var Receiver = /** @class */ (function () {
    function Receiver() {
    }
    Receiver.prototype.doSomething = function (a) {
        console.log("Receiver: Working on (".concat(a, ".)"));
    };
    Receiver.prototype.doSomethingElse = function (b) {
        console.log("Receiver: Also working on (".concat(b, ".)"));
    };
    return Receiver;
}());
// The Invoker is associated with commands and delgates work to them
var Invoker = /** @class */ (function () {
    function Invoker() {
    }
    // Initialize commands for start and finish
    Invoker.prototype.setOnStart = function (command) {
        this.onStart = command;
    };
    Invoker.prototype.setOnFinish = function (command) {
        this.onFinish = command;
    };
    // Invoker passes requests indirectly through commands
    Invoker.prototype.doSomethingImportant = function () {
        console.log('Invoker: Does anybody want something done before I begin?');
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }
        console.log('\nInvoker: ...doing something really important...\n');
        console.log('Invoker: Does anybody want something done after I finish?');
        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
    };
    Invoker.prototype.isCommand = function (object) {
        return object.execute !== undefined;
    };
    return Invoker;
}());
// Client code
var invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Printed Message'));
var receiver = new Receiver();
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
