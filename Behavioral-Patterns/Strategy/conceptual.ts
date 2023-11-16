// Context is what the client will interact with.
class Context {
    // Context has reference to a single strategy, only working with Stategy interface.
    private strategy: Strategy;

    // You take a strategy at construction for the inital one ...
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    // ... but you can also set it during runtime with this
    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    // Some bussiness is done and work is delegated to the current strategy
    public doSomeBusinessLogic(): void {
        console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
        const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));
    }
}

// Strategy interface decalres methods common to all version of an algorithm, the context works with this interafce
interface Strategy {
    doAlgorithm(data: string[]): string[];
}

// The concrete statregys implement the algorithim in a certian way
class ConcreteStrategyA implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.sort();
    }
}

class ConcreteStrategyB implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.reverse();
    }
}

// Client code
const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();

/* OUTPUT
Client: Strategy is set to normal sorting.
Context: Sorting data using the strategy (not sure how it'll do it)
a,b,c,d,e

Client: Strategy is set to reverse sorting.
Context: Sorting data using the strategy (not sure how it'll do it)
e,d,c,b,a
*/