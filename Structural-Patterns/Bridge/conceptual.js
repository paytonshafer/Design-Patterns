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
/**
 * The Abstraction is the "control" part of the two hierarchies and is what the client will interact with.
 * This maintains a reference of the implementation and delegates all work to it.
 */
var Abstraction = /** @class */ (function () {
    function Abstraction(implementation) {
        this.implementation = implementation;
    }
    // Opteration usues the implementation to do work
    Abstraction.prototype.operation = function () {
        var result = this.implementation.operationImplementation();
        return "Abstraction: Base operation with:\n".concat(result);
    };
    return Abstraction;
}());
// Extend the Abstraction to give it extra functionality and not worrying ab changing the implemenation
var ExtendedAbstraction = /** @class */ (function (_super) {
    __extends(ExtendedAbstraction, _super);
    function ExtendedAbstraction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtendedAbstraction.prototype.operation = function () {
        var result = this.implementation.operationImplementation();
        return "ExtendedAbstraction: Extended operation with:\n".concat(result);
    };
    return ExtendedAbstraction;
}(Abstraction));
// Concrete Implementation A is for platform A
var ConcreteImplementationA = /** @class */ (function () {
    function ConcreteImplementationA() {
    }
    ConcreteImplementationA.prototype.operationImplementation = function () {
        return 'ConcreteImplementationA: Here\'s the result on the platform A.';
    };
    return ConcreteImplementationA;
}());
// Concrete Implementation B is for platform B
var ConcreteImplementationB = /** @class */ (function () {
    function ConcreteImplementationB() {
    }
    ConcreteImplementationB.prototype.operationImplementation = function () {
        return 'ConcreteImplementationB: Here\'s the result on the platform B.';
    };
    return ConcreteImplementationB;
}());
/**
 * The Client works only with the abstraction, the only use of the implemenation should be when linking it to the abstraction
 * @param abstraction This is the abstraction the client uses and it should already be linked to the implementation
 */
function clientCode(abstraction) {
    console.log(abstraction.operation());
}
// Client code can work with any implementation abstraction combination
console.log("Here is the client working with different implemenations through the abstraction.");
console.log("Note that the client can work with any implementation abstraction combination.");
console.log();
var implementation = new ConcreteImplementationA();
var abstraction = new Abstraction(implementation);
clientCode(abstraction);
console.log('');
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
console.log('');
implementation = new ConcreteImplementationB();
abstraction = new Abstraction(implementation);
clientCode(abstraction);
console.log('');
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
/* OUTPUT
Here is the client working with different implemenations through the abstraction.
Note that the client can work with any implementation abstraction combination.

Abstraction: Base operation with:
ConcreteImplementationA: Here's the result on the platform A.

ExtendedAbstraction: Extended operation with:
ConcreteImplementationA: Here's the result on the platform A.

Abstraction: Base operation with:
ConcreteImplementationB: Here's the result on the platform B.

ExtendedAbstraction: Extended operation with:
ConcreteImplementationB: Here's the result on the platform B.
*/
