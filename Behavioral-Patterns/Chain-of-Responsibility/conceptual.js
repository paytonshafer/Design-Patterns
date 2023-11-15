var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Default chaining method is set here.
var AbstractHandler = /** @class */ (function () {
    function AbstractHandler() {
    }
    AbstractHandler.prototype.setNext = function (handler) {
        this.nextHandler = handler;
        // The return of the handler allows one to chain handlers in one line (see client below)
        return handler;
    };
    AbstractHandler.prototype.handle = function (request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return '';
    };
    return AbstractHandler;
}());
// All Concrete handlers either handle the request or pass it to the next handler.
var MonkeyHandler = /** @class */ (function (_super) {
    __extends(MonkeyHandler, _super);
    function MonkeyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonkeyHandler.prototype.handle = function (request) {
        if (request === 'Banana') {
            return "Monkey: I'll eat the ".concat(request, ".");
        }
        return _super.prototype.handle.call(this, request);
    };
    return MonkeyHandler;
}(AbstractHandler));
var SquirrelHandler = /** @class */ (function (_super) {
    __extends(SquirrelHandler, _super);
    function SquirrelHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SquirrelHandler.prototype.handle = function (request) {
        if (request === 'Nut') {
            return "Squirrel: I'll eat the ".concat(request, ".");
        }
        return _super.prototype.handle.call(this, request);
    };
    return SquirrelHandler;
}(AbstractHandler));
var DogHandler = /** @class */ (function (_super) {
    __extends(DogHandler, _super);
    function DogHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DogHandler.prototype.handle = function (request) {
        if (request === 'MeatBall') {
            return "Dog: I'll eat the ".concat(request, ".");
        }
        return _super.prototype.handle.call(this, request);
    };
    return DogHandler;
}(AbstractHandler));
// Client code works with a single handler and most times is not aware of the chain
function clientCode(handler) {
    var foods = ['Nut', 'Banana', 'Cup of coffee', 'MeatBall'];
    for (var _i = 0, foods_1 = foods; _i < foods_1.length; _i++) {
        var food = foods_1[_i];
        console.log("Client: Who wants a ".concat(food, "?"));
        var result = handler.handle(food);
        if (result != '') {
            console.log("  ".concat(result));
        }
        else {
            console.log("  ".concat(food, " was left untouched."));
        }
    }
}
// Below is the construction of the chain
var monkey = new MonkeyHandler();
var squirrel = new SquirrelHandler();
var dog = new DogHandler();
monkey.setNext(squirrel).setNext(dog);
// Client can send requests to any handler not just the first one in the chain.
console.log('Chain: Monkey > Squirrel > Dog\n');
clientCode(monkey);
console.log('');
console.log('Subchain: Squirrel > Dog\n');
clientCode(squirrel);
