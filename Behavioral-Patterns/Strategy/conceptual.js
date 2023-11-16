// Context is what the client will interact with.
var Context = /** @class */ (function () {
    // You take a strategy at construction for the inital one ...
    function Context(strategy) {
        this.strategy = strategy;
    }
    // ... but you can also set it during runtime with this
    Context.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    // Some bussiness is done and work is delegated to the current strategy
    Context.prototype.doSomeBusinessLogic = function () {
        console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
        var result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));
    };
    return Context;
}());
// The concrete statregys implement the algorithim in a certian way
var ConcreteStrategyA = /** @class */ (function () {
    function ConcreteStrategyA() {
    }
    ConcreteStrategyA.prototype.doAlgorithm = function (data) {
        return data.sort();
    };
    return ConcreteStrategyA;
}());
var ConcreteStrategyB = /** @class */ (function () {
    function ConcreteStrategyB() {
    }
    ConcreteStrategyB.prototype.doAlgorithm = function (data) {
        return data.reverse();
    };
    return ConcreteStrategyB;
}());
// Client code
var context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();
console.log('');
console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
