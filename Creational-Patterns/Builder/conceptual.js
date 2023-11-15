/**
 * The concrete builder classes will follow the builder interface provided and give specific
 * implementations of methods provided. You may have many builders implemented differently.
 */
var ConcreteBuilder1 = /** @class */ (function () {
    // When a new concrete builder is made we want to start with a fresh product
    function ConcreteBuilder1() {
        this.reset();
    }
    ConcreteBuilder1.prototype.reset = function () {
        this.product = new Product1();
    };
    // All the following production methods work with a singular product
    ConcreteBuilder1.prototype.producePartA = function () {
        this.product.parts.push('PartA');
    };
    ConcreteBuilder1.prototype.producePartB = function () {
        this.product.parts.push('PartB');
    };
    ConcreteBuilder1.prototype.producePartZ = function () {
        this.product.parts.push('PartZ');
    };
    /**
     * This is the way to get the product the builder just made and give it a new blank template.
     * Most builders wil return the object their own way so this method is not in the interface.
     * @returns the product you are building
     */
    ConcreteBuilder1.prototype.getProduct = function () {
        var result = this.product;
        this.reset();
        return result;
    };
    return ConcreteBuilder1;
}());
// Here is another builder that makes a differnt product with the same parts
var ConcreteBuilder2 = /** @class */ (function () {
    // When a new concrete builder is made we want to start with a fresh product
    function ConcreteBuilder2() {
        this.reset();
    }
    ConcreteBuilder2.prototype.reset = function () {
        this.product = new Product2();
    };
    // All the following production methods work with a singular product
    ConcreteBuilder2.prototype.producePartA = function (num) {
        this.product.setPartA(num);
    };
    ConcreteBuilder2.prototype.producePartB = function (num) {
        this.product.setPartB(num);
    };
    ConcreteBuilder2.prototype.producePartZ = function (num) {
        this.product.setPartC(num);
    };
    /**
     * This is the way to get the product the builder just made and give it a new blank template.
     * Most builders wil return the object their own way so this method is not in the interface.
     * @returns the product you are building
     */
    ConcreteBuilder2.prototype.getProduct = function () {
        var result = this.product;
        this.reset();
        return result;
    };
    return ConcreteBuilder2;
}());
/**
 * Use the Builder pattern only when your products are quite complex and require extensive configuration.
 * Note that results of various builders may not always follow the same interface.
 */
var Product1 = /** @class */ (function () {
    function Product1() {
        this.parts = [];
    }
    Product1.prototype.listParts = function () {
        return "Product parts: ".concat(this.parts.join(', '), "\n");
    };
    return Product1;
}());
/**
 * Here product 2 is like product 1 but more customizable, this is to show how different builder interfaces can
 * be used to create 2 different products. It also goes to show how products can be fully customizable.
 */
var Product2 = /** @class */ (function () {
    function Product2() {
        this.numA = 0;
        this.numB = 0;
        this.numC = 0;
    }
    Product2.prototype.setPartA = function (num) {
        this.numA = num;
    };
    Product2.prototype.setPartB = function (num) {
        this.numB = num;
    };
    Product2.prototype.setPartC = function (num) {
        this.numC = num;
    };
    Product2.prototype.listParts = function () {
        return "Product parts: ".concat(this.numA, "x PartA, ").concat(this.numB, "x PartB, ").concat(this.numC, "x PartC\n");
    };
    return Product2;
}());
/**
 * Here is the dirrector where one can create methods for commonly craeted products. For example,
 * there is the minumum product with just part A and the full product which has all the parts.
 */
var Director = /** @class */ (function () {
    function Director() {
    }
    // The director may work with any builder so this is necessary if the client wants to use different builders
    Director.prototype.setBuilder = function (builder) {
        this.builder = builder;
    };
    Director.prototype.buildMinProduct = function () {
        this.builder.producePartA(1);
    };
    Director.prototype.buildFullProduct = function () {
        this.builder.producePartA(1);
        this.builder.producePartB(1);
        this.builder.producePartZ(1);
    };
    Director.prototype.buildCustomProduct = function (nums) {
        this.builder.producePartA(nums[0]);
        this.builder.producePartB(nums[1]);
        this.builder.producePartZ(nums[2]);
    };
    return Director;
}());
/**
 * The client code takes a directory which is then fed a builder. The final products are
 * retrieved from the builders. Note that the builder can be used with out a director class.
 */
var client = function (director) {
    var builder1 = new ConcreteBuilder1();
    director.setBuilder(builder1);
    console.log('BUILDING PRODUCT1');
    console.log('Standard Product:');
    director.buildMinProduct();
    console.log(builder1.getProduct().listParts());
    console.log('Full Featured Product:');
    director.buildFullProduct();
    console.log(builder1.getProduct().listParts());
    console.log('Custom Product:');
    builder1.producePartB();
    builder1.producePartZ();
    console.log(builder1.getProduct().listParts());
    var builder2 = new ConcreteBuilder2();
    director.setBuilder(builder2);
    console.log('BUILDING PRODUCT2');
    console.log('Standard Product:');
    director.buildMinProduct();
    console.log(builder2.getProduct().listParts());
    console.log('Full Featured Product:');
    director.buildFullProduct();
    console.log(builder2.getProduct().listParts());
    console.log('Custom Product:');
    director.buildCustomProduct([4, 8, 5]);
    console.log(builder2.getProduct().listParts());
    console.log('Another Custom Product:');
    builder2.producePartA(5);
    builder2.producePartZ(9);
    console.log(builder2.getProduct().listParts());
};
client(new Director());
/**
 * OUTPUT:
 * BUILDING PRODUCT1
 * Standard Product:
 * Product parts: PartA
 *
 * Full Featured Product:
 * Product parts: PartA, PartB, PartZ
 *
 * Custom Product:
 * Product parts: PartB, PartZ
 *
 * BUILDING PRODUCT2
 * Standard Product:
 * Product parts: 1x PartA, 0x PartB, 0x PartC
 *
 * Full Featured Product:
 * Product parts: 1x PartA, 1x PartB, 1x PartC
 *
 * Custom Product:
 * Product parts: 4x PartA, 8x PartB, 5x PartC
 *
 * Another Custom Product:
 * Product parts: 5x PartA, 0x PartB, 9x PartC
 */ 
