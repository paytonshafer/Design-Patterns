/**
 * The Originator holds the important state that changes over time. There is also
 * methods for saving the state in a mememto and restoring the state from it.
 */
var Originator = /** @class */ (function () {
    function Originator(state) {
        this.state = state;
        console.log("Originator: My initial state is: ".concat(state));
    }
    /**
     * The Originator's business logic may affect its internal state. Therefore,
     * the client should backup the state before launching methods of the
     * business logic via the save() method.
     */
    // The Originator have logic they may change the internal state, client should use save to have a backup before this operation
    Originator.prototype.doSomething = function () {
        console.log('Originator: I\'m doing something important.');
        this.state = this.generateRandomString(30);
        console.log("Originator: and my state has changed to: ".concat(this.state));
    };
    Originator.prototype.generateRandomString = function (length) {
        if (length === void 0) { length = 10; }
        var charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array
            .apply(null, { length: length })
            .map(function () { return charSet.charAt(Math.floor(Math.random() * charSet.length)); })
            .join('');
    };
    // Save state in a memento
    Originator.prototype.save = function () {
        return new ConcreteMemento(this.state);
    };
    // Restore state from memento object
    Originator.prototype.restore = function (memento) {
        this.state = memento.getState();
        console.log("Originator: My state has changed to: ".concat(this.state));
    };
    return Originator;
}());
// Concrete Memento implements methods for storing the state
var ConcreteMemento = /** @class */ (function () {
    function ConcreteMemento(state) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    // Orginator uses this method to restore a state
    ConcreteMemento.prototype.getState = function () {
        return this.state;
    };
    // Below methods are for caretaker to display data
    ConcreteMemento.prototype.getName = function () {
        return "".concat(this.date, " / (").concat(this.state.slice(0, 9), "...)");
    };
    ConcreteMemento.prototype.getDate = function () {
        return this.date;
    };
    return ConcreteMemento;
}());
/**
 * Caretaker only works with the memento interface this it won't have access to the originators state.
 */
var Caretaker = /** @class */ (function () {
    function Caretaker(originator) {
        this.mementos = [];
        this.originator = originator;
    }
    Caretaker.prototype.backup = function () {
        console.log('\nCaretaker: Saving Originator\'s state...');
        this.mementos.push(this.originator.save());
    };
    Caretaker.prototype.undo = function () {
        if (!this.mementos.length) {
            return;
        }
        var memento = this.mementos.pop();
        if (memento) {
            console.log("Caretaker: Restoring state to: ".concat(memento.getName()));
            this.originator.restore(memento);
        }
    };
    Caretaker.prototype.showHistory = function () {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (var _i = 0, _a = this.mementos; _i < _a.length; _i++) {
            var memento = _a[_i];
            console.log(memento.getName());
        }
    };
    return Caretaker;
}());
// Client code
var originator = new Originator('Hello World');
var caretaker = new Caretaker(originator);
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
