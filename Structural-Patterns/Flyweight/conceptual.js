/**
 * The flighweight stores the shared state that may belong to more than one entity.
 * It then accepts rest of the state, the unique portion, by methods parameters.
 */
var Flyweight = /** @class */ (function () {
    function Flyweight(sharedState) {
        this.sharedState = sharedState;
    }
    Flyweight.prototype.operation = function (uniqueState) {
        var s = JSON.stringify(this.sharedState);
        var u = JSON.stringify(uniqueState);
        console.log("Flyweight: Displaying shared (".concat(s, ") and unique (").concat(u, ") state."));
    };
    return Flyweight;
}());
/**
 * The Flyweight Factory is in chaarge of creating and managing the flyweight objects.
 * When a client requests a flyweight it either returns the instance or creates a new one.
 */
var FlyweightFactory = /** @class */ (function () {
    function FlyweightFactory(initialFlyweights) {
        this.flyweights = {};
        for (var _i = 0, initialFlyweights_1 = initialFlyweights; _i < initialFlyweights_1.length; _i++) {
            var state = initialFlyweights_1[_i];
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }
    // Returns string hash when given a state
    FlyweightFactory.prototype.getKey = function (state) {
        return state.join('_');
    };
    // Given a state it either returns it or creates a new one
    FlyweightFactory.prototype.getFlyweight = function (sharedState) {
        var key = this.getKey(sharedState);
        if (!(key in this.flyweights)) {
            console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
            this.flyweights[key] = new Flyweight(sharedState);
        }
        else {
            console.log('FlyweightFactory: Reusing existing flyweight.');
        }
        return this.flyweights[key];
    };
    FlyweightFactory.prototype.listFlyweights = function () {
        var count = Object.keys(this.flyweights).length;
        console.log("\nFlyweightFactory: I have ".concat(count, " flyweights:"));
        for (var key in this.flyweights) {
            console.log(key);
        }
    };
    return FlyweightFactory;
}());
// Client usually starts with common preinitialized flyweights
var factory = new FlyweightFactory([
    ['shared1a', 'shared1b'],
    ['shared2a', 'shared2b'],
]);
factory.listFlyweights();
console.log("\nClient: Adding an instance.");
var flyweight1 = factory.getFlyweight(['shared1a', 'shared1b']);
flyweight1.operation(['unique1a', 'unique1b']);
console.log("\nClient: Adding an instance.");
var flyweight2 = factory.getFlyweight(['shared3a', 'shared3b']);
flyweight2.operation(['unique3a', 'unique3b']);
factory.listFlyweights();
