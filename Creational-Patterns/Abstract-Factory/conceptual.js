/**
 * A concrete factory produces a family of products for a SINGLE varient, thus guaranteeing the products
 * created by this factory are compatible. Note that the signatures return an abstract product but inside
 * the method the concrete product is returned. This concrete factory creates the product family for varient A.
 */
var ConcreteFactoryA = /** @class */ (function () {
    function ConcreteFactoryA() {
    }
    // Create product 1 with varient A
    ConcreteFactoryA.prototype.createProduct1 = function () {
        return new ConcreteProduct1A();
    };
    // Create product 2 with varient A
    ConcreteFactoryA.prototype.createProduct2 = function () {
        return new ConcreteProduct2A();
    };
    return ConcreteFactoryA;
}());
// This concrete factory works in the same way as aboce but this concrete factory creates the product family for varient B.
var ConcreteFactoryB = /** @class */ (function () {
    function ConcreteFactoryB() {
    }
    // Create product 1 with varient B
    ConcreteFactoryB.prototype.createProduct1 = function () {
        return new ConcreteProduct1B();
    };
    // Create product 2 with varient B
    ConcreteFactoryB.prototype.createProduct2 = function () {
        return new ConcreteProduct2B();
    };
    return ConcreteFactoryB;
}());
// Here is product 1 with varient A 
var ConcreteProduct1A = /** @class */ (function () {
    function ConcreteProduct1A() {
    }
    ConcreteProduct1A.prototype.operation1 = function () {
        return 'Concrete Product 1 with varient A';
    };
    return ConcreteProduct1A;
}());
// Here is product 1 with varient B
var ConcreteProduct1B = /** @class */ (function () {
    function ConcreteProduct1B() {
    }
    ConcreteProduct1B.prototype.operation1 = function () {
        return 'Concrete Product 1 with varient B';
    };
    return ConcreteProduct1B;
}());
// Here is product 2 with varient A
var ConcreteProduct2A = /** @class */ (function () {
    function ConcreteProduct2A() {
    }
    ConcreteProduct2A.prototype.operation2 = function () {
        return 'Concrete Product 2 with varient A';
    };
    // Here we can work with Concrete Product 1 with out worrying about the varients being incompatable
    ConcreteProduct2A.prototype.anotherOperation2 = function (otherProduct) {
        var result = otherProduct.operation1();
        return 'The result of Concrete Product 2 with varient A working with product 1 is ' + result;
    };
    return ConcreteProduct2A;
}());
// Here is product 2 with varient B
var ConcreteProduct2B = /** @class */ (function () {
    function ConcreteProduct2B() {
    }
    ConcreteProduct2B.prototype.operation2 = function () {
        return 'Concrete Product 2 with varient B';
    };
    // Here we can work with Concrete Product 1 with out worrying about the varients being incompatable
    ConcreteProduct2B.prototype.anotherOperation2 = function (otherProduct) {
        var result = otherProduct.operation1();
        return 'The result of Concrete Product 2 with varient B working with product 1 is ' + result;
    };
    return ConcreteProduct2B;
}());
/**
 * The client code works with factories and products only through their abstract
 * types: AbstractFactory and AbstractProduct. This allows you to pass a factory to
 * the client, thus all products in the client will be of the same varient since they
 * will all be made in the same factory.
 */
function clientCode(factory) {
    var product1 = factory.createProduct1();
    var product2 = factory.createProduct2();
    console.log('Creating... ' + product1.operation1());
    console.log('Creating... ' + product2.operation2());
    console.log(product2.anotherOperation2(product1));
}
// The client code is able to work with any factory type thus ensuring all products are of same varient in client code
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactoryA());
console.log('Note all products from the first factory are of varient A');
console.log('');
console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactoryB());
console.log('Note all products from the first factory are of varient B');
