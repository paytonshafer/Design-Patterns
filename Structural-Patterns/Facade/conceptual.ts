/**
 * The Facade class provides a simple interface to the complex logic of one or several subsystems. 
 * It delegates the client requests to the appropriate objects within the subsystem as well as 
 * managing said objects lifestyle.
 */
class Facade {
    protected subsystem1: Subsystem1;

    protected subsystem2: Subsystem2;

    // Depending on application you can provide precreated subststems or create predetermined ones
    constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
        this.subsystem1 = subsystem1 || new Subsystem1();
        this.subsystem2 = subsystem2 || new Subsystem2();
    }

    // The Facades methods are convient ways to use the sub systems complex operations, though the client gets a fraction of the operations
    public operation(): string {
        let result = 'Facade initializes subsystems:\n';
        result += this.subsystem1.operation1();
        result += this.subsystem2.operation1();
        result += 'Facade orders subsystems to perform the action:\n';
        result += this.subsystem1.operationC();
        result += this.subsystem2.operationP();

        return result;
    }
}

// Rememeber subsystems can be interacted with the client or facade, the facade just helps simplify key operations for the client
class Subsystem1 {
    public operation1(): string {
        return 'Subsystem1: Ready!\n';
    }

    // Other complex and extensive methods here

    public operationC(): string {
        return 'Subsystem1: Go!\n';
    }
}

// Facades can even with with more than one sub system at a time
class Subsystem2 {
    public operation1(): string {
        return 'Subsystem2: Get ready!\n';
    }

    // Other complex and extensive methods here

    public operationP(): string {
        return 'Subsystem2: Fire!';
    }
}

/**
 * The client code works with complex subsystems through a simple interface
 * provided by the Facade. When a facade manages the lifecycle of the subsystem,
 * the client might not even know about the existence of the subsystem. This
 * approach lets you keep the complexity under control.
 */
function clientCode(facade: Facade) {
    console.log(facade.operation());
}

// The client code can use already pre initialized sub systems if they have them
console.log("Client: I am going to use my pre-initalized sub-systems:")
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade1 = new Facade(subsystem1, subsystem2);
clientCode(facade1)

// Or the client can rely on the Facade to initalize the subsystems
console.log("\nClient: I am going to let the Facade initalize the sub-systems:")
const facade2 = new Facade();
clientCode(facade2)

/* OUTPUT
Client: I am going to use my pre-initalized sub-systems:
Facade initializes subsystems:
Subsystem1: Ready!
Subsystem2: Get ready!
Facade orders subsystems to perform the action:
Subsystem1: Go!
Subsystem2: Fire!

Client: I am going to let the Facade initalize the sub-systems:
Facade initializes subsystems:
Subsystem1: Ready!
Subsystem2: Get ready!
Facade orders subsystems to perform the action:
Subsystem1: Go!
Subsystem2: Fire!
*/