/**
 * The Facade class provides a simple interface to the complex logic of one or several subsystems.
 * It delegates the client requests to the appropriate objects within the subsystem as well as
 * managing said objects lifestyle.
 */
var Facade = /** @class */ (function () {
    // Depending on application you can provide precreated subststems or create predetermined ones
    function Facade(subsystem1, subsystem2) {
        this.subsystem1 = subsystem1 || new Subsystem1();
        this.subsystem2 = subsystem2 || new Subsystem2();
    }
    // The Facades methods are convient ways to use the sub systems complex operations, though the client gets a fraction of the operations
    Facade.prototype.operation = function () {
        var result = 'Facade initializes subsystems:\n';
        result += this.subsystem1.operation1();
        result += this.subsystem2.operation1();
        result += 'Facade orders subsystems to perform the action:\n';
        result += this.subsystem1.operationC();
        result += this.subsystem2.operationP();
        return result;
    };
    return Facade;
}());
// Rememeber subsystems can be interacted with the client or facade, the facade just helps simplify key operations for the client
var Subsystem1 = /** @class */ (function () {
    function Subsystem1() {
    }
    Subsystem1.prototype.operation1 = function () {
        return 'Subsystem1: Ready!\n';
    };
    // Other complex and extensive methods here
    Subsystem1.prototype.operationC = function () {
        return 'Subsystem1: Go!\n';
    };
    return Subsystem1;
}());
// Facades can even with with more than one sub system at a time
var Subsystem2 = /** @class */ (function () {
    function Subsystem2() {
    }
    Subsystem2.prototype.operation1 = function () {
        return 'Subsystem2: Get ready!\n';
    };
    // Other complex and extensive methods here
    Subsystem2.prototype.operationP = function () {
        return 'Subsystem2: Fire!';
    };
    return Subsystem2;
}());
/**
 * The client code works with complex subsystems through a simple interface
 * provided by the Facade. When a facade manages the lifecycle of the subsystem,
 * the client might not even know about the existence of the subsystem. This
 * approach lets you keep the complexity under control.
 */
function clientCode(facade) {
    console.log(facade.operation());
}
// The client code can use already pre initialized sub systems if they have them
console.log("Client: I am going to use my pre-initalized sub-systems:");
var subsystem1 = new Subsystem1();
var subsystem2 = new Subsystem2();
var facade1 = new Facade(subsystem1, subsystem2);
clientCode(facade1);
// Or the client can rely on the Facade to initalize the subsystems
console.log("\nClient: I am going to let the Facade initalize the sub-systems:");
var facade2 = new Facade();
clientCode(facade2);
