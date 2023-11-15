/**
 * The contect defines the interface the client wiil work with as well
 * as keeping a reference to an instance of the State subclass which is the state of the context.
 */
class Context {
    // Reference to current state
    private state: State;

    constructor(state: State) {
        this.transitionTo(state);
    }

    // Method to allow change in state during runtime
    public transitionTo(state: State): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    // The context delegates it's work to its current state
    public request1(): void {
        this.state.handle1();
    }

    public request2(): void {
        this.state.handle2();
    }
}

/**
 * Base State decalres the methods that all concrete states must implement.
 * It also has a backreference to the context object that would use the state.
 * This backreference allows states to transition the context to another state.
 */
abstract class State {
    protected context: Context;

    public setContext(context: Context) {
        this.context = context;
    }

    public abstract handle1(): void;

    public abstract handle2(): void;
}

// Concrete states implement behaviors for a state of the context
class ConcreteStateA extends State {
    public handle1(): void {
        console.log('ConcreteStateA handles request1.');
        console.log('ConcreteStateA wants to change the state of the context.');
        this.context.transitionTo(new ConcreteStateB());
    }

    public handle2(): void {
        console.log('ConcreteStateA handles request2.');
    }
}

class ConcreteStateB extends State {
    public handle1(): void {
        console.log('ConcreteStateB handles request1.');
    }

    public handle2(): void {
        console.log('ConcreteStateB handles request2.');
        console.log('ConcreteStateB wants to change the state of the context.');
        this.context.transitionTo(new ConcreteStateA());
    }
}

// Client code
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
context.request2();