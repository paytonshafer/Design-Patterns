// Base componenet defines operations that the decorator will want to alter
interface Component {
    operation(): string;
}

// Concrete componenet defines defauls behavior of operation (they may be more than one concrete componenet)
class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

/**
 * The base Decorator class follows the same interface as the other components.
 * The purpose of this is to define the wrapping interface for the concrete decorators.
 * Here we have a feild for storing the wrapped componenet/
 */
class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    // Decorator delegates work to the wrappee (component)
    public operation(): string {
        return this.component.operation();
    }
}

// The concrete decorator calls the wrapped object and alter the results in some way.
class ConcreteDecoratorA extends Decorator {

    // Decorators may simply call the parent implementation of operation which simpliefies the extension.
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

// Decoratos can execute their behavior before or after the call to the wrapped object
class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

// The client code works with all objects through the componenent interface thus staying independant of concrete implementations.
function clientCode(component: Component) {
    console.log(`RESULT: ${component.operation()}`);
}

// Client code supports simple componets.
const simple = new ConcreteComponent();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

// Client code can also work with decorated ones.
// Note how decorators can wrap not only simple components but other decorators as well.
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);