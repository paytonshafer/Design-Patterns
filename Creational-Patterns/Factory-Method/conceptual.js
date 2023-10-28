// This is the conceptual example of the Factory Method in JavaScript
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
/*
* Creator Class declares that factory method that is supposed to return a
* an object of the product class. The creator subclass provides the
* implemnation of said method.
*/
var Creator = /** @class */ (function () {
    function Creator() {
    }
    /*
    * Here we have an operation for the creator class where it will use the product
    * The creator class is often to preform some kind of bussiness logic based on the product
    * The subclasses can then override the factory method to change said logic
    */
    Creator.prototype.operation = function () {
        // Call the factory method to create the produc
        var product = this.factoryMethod();
        // Use of the product
        return "The same creator code creates ".concat(product.operation());
    };
    return Creator;
}());
// Here is a concrete creator that overrides the factory method to craete a concrete product (A)
var ConcreteCreatorA = /** @class */ (function (_super) {
    __extends(ConcreteCreatorA, _super);
    function ConcreteCreatorA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Note that the subclass still returns the abstract product, this way the Creator is independant of concrete product classes
    ConcreteCreatorA.prototype.factoryMethod = function () {
        return new ConcreteProductA();
    };
    return ConcreteCreatorA;
}(Creator));
// Here is another concrete creator that overrides the factory method to craete a concrete product (B)
var ConcreteCreatorB = /** @class */ (function (_super) {
    __extends(ConcreteCreatorB, _super);
    function ConcreteCreatorB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Note that the subclass still returns the abstract product, this way the Creator is independant of concrete product classes
    ConcreteCreatorB.prototype.factoryMethod = function () {
        return new ConcreteProductB();
    };
    return ConcreteCreatorB;
}(Creator));
// Concrete product A provides one way for Product implementation
var ConcreteProductA = /** @class */ (function () {
    function ConcreteProductA() {
    }
    ConcreteProductA.prototype.operation = function () {
        return 'results from Concrete Product A';
    };
    return ConcreteProductA;
}());
// Concrete product B provides another way for Product implementation
var ConcreteProductB = /** @class */ (function () {
    function ConcreteProductB() {
    }
    ConcreteProductB.prototype.operation = function () {
        return 'results from Concrete Product B';
    };
    return ConcreteProductB;
}());
/*
* The client code works as an instance of a concrete creator but through the base interface.
* Since it works with creator via base it can be passed any concrete creator
*/
function clientCode(creator) {
    console.log('Client: I am not aware of what creator class is being used');
    console.log(creator.operation());
}
// The Application can be launched with different creators based on config, env or anything!
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreatorA());
console.log('');
console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreatorB());
