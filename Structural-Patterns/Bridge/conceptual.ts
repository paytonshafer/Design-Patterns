/**
 * The Abstraction is the "control" part of the two hierarchies and is what the client will interact with.
 * This maintains a reference of the implementation and delegates all work to it.
 */
class Abstraction {
    protected implementation: Implementation;

    constructor(implementation: Implementation) {
        this.implementation = implementation;
    }

    // Opteration usues the implementation to do work
    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Base operation with:\n${result}`;
    }
}

// Extend the Abstraction to give it extra functionality and not worrying ab changing the implemenation
class ExtendedAbstraction extends Abstraction {
    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `ExtendedAbstraction: Extended operation with:\n${result}`;
    }
}

/**
 * The Implementation is an interface for all implementation classes. It can be totally different
 * than the Abstraction and may provide pimpitive operations while the abstraction uses the primities
 * for higher level operations.
 */
interface Implementation {
    operationImplementation(): string;
}

// Concrete Implementation A is for platform A
class ConcreteImplementationA implements Implementation {
    public operationImplementation(): string {
        return 'ConcreteImplementationA: Here\'s the result on the platform A.';
    }
}

// Concrete Implementation B is for platform B
class ConcreteImplementationB implements Implementation {
    public operationImplementation(): string {
        return 'ConcreteImplementationB: Here\'s the result on the platform B.';
    }
}

/**
 * The Client works only with the abstraction, the only use of the implemenation should be when linking it to the abstraction
 * @param abstraction This is the abstraction the client uses and it should already be linked to the implementation
 */
function clientCode(abstraction: Abstraction) {
    console.log(abstraction.operation());
}

// Client code can work with any implementation abstraction combination
console.log("Here is the client working with different implemenations through the abstraction.")
console.log("Note that the client can work with any implementation abstraction combination.")
console.log()
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
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
