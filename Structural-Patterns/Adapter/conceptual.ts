// The target defins the first domain specific interface that will be used and need the adapter
class Target {
    public request(): string {
        return 'Target: The default target\'s behavior.';
    }
}

/**
 * The Adaptee contains some behavior that the client wants to use and may be useful.
 * But, the interface is incompatible so our normal Target can not communicate with this.
 */
class Adaptee {
    public specificRequest(): string {
        // This returns something that our orignal interface would not understand (represented by backwards text)
        return '.eetpadA eht fo roivaheb laicepS';
    }
}

// The adapter makes it so the target can be commpatible with the Adaptee, Note it extends the Target.
class Adapter extends Target {
    // The target is created with an adaptee as it wraps itself around the adaptee
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    // This function calls the useful function from the Adaptee and convets it to something the client/Target can understand
    public request(): string {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

// Client class that uses target interface
function clientCode(target: Target) {
    console.log(target.request());
}

console.log('Client: I can work with Target objects:');
const target = new Target();
clientCode(target);

console.log('');

const adaptee = new Adaptee();
console.log('Client: The Adaptee class has an interface I do not understand:');
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('');

console.log('Client: With the Adapter I can understand the Adaptee:');
const adapter = new Adapter(adaptee);
clientCode(adapter);

/* OUTPUT
Client: I can work with Target objects:
Target: The default target's behavior.

Client: The Adaptee class has an interface I do not understand:
Adaptee: .eetpadA eht fo roivaheb laicepS

Client: With the Adapter I can understand the Adaptee:
Adapter: (TRANSLATED) Special behavior of the Adaptee.
*/