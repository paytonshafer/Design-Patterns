/**
 * This is the abstract factory that declares a set of methods to create different abstract products.
 * These products in the abstract factory are called a family and related by a high-level concept.
 * Most times products of one family can collaborate with eachother. Families of products often have
 * many varients, but products of one varient are NOT compatiable with products of another varient. 
 */
interface AbstractFactory {
    // Here the family of products is product1 and product2
    createProduct1(): AbstractProduct1;

    createProduct2(): AbstractProduct2;
}

/**
 * A concrete factory produces a family of products for a SINGLE varient, thus guaranteeing the products
 * created by this factory are compatible. Note that the signatures return an abstract product but inside
 * the method the concrete product is returned. This concrete factory creates the product family for varient A.
 */
class ConcreteFactoryA implements AbstractFactory{
    // Create product 1 with varient A
    public createProduct1(): AbstractProduct1 {
        return new ConcreteProduct1A();
    }

    // Create product 2 with varient A
    public createProduct2(): AbstractProduct2 {
        return new ConcreteProduct2A();
    }
}

// This concrete factory works in the same way as aboce but this concrete factory creates the product family for varient B.
class ConcreteFactoryB implements AbstractFactory{
    // Create product 1 with varient B
    public createProduct1(): AbstractProduct1 {
        return new ConcreteProduct1B();
    }

    // Create product 2 with varient B
    public createProduct2(): AbstractProduct2 {
        return new ConcreteProduct2B();
    }
}

/**
 * Each product of a product family has a base interface where all varients of this product must
 * implement this interface. This is the abstract interfance for Product 1.
 */
interface AbstractProduct1 {
    // Here operation will return the product type along with its varient
    operation1(): string;
}

// Here is product 1 with varient A 
class ConcreteProduct1A implements AbstractProduct1 {
    public operation1(): string {
        return 'Concrete Product 1 with varient A'
    }
}

// Here is product 1 with varient B
class ConcreteProduct1B implements AbstractProduct1 {
    public operation1(): string {
        return 'Concrete Product 1 with varient B'
    }
}

// This is the abstract interfance for Product 2.
interface AbstractProduct2 {
    // Here operation will return the product type along with its varient
    operation2(): string;

    // Another operation allows product 2 to interact with another product with out worrying ab the varient.
    anotherOperation2(otherProduct: AbstractProduct1): string;
}

// Here is product 2 with varient A
class ConcreteProduct2A implements AbstractProduct2 {
    public operation2(): string {
        return 'Concrete Product 2 with varient A'
    }

    // Here we can work with Concrete Product 1 with out worrying about the varients being incompatable
    public anotherOperation2(otherProduct: AbstractProduct1): string {
        const result = otherProduct.operation1()
        return 'The result of Concrete Product 2 with varient A working with product 1 is ' + result
    }
}

// Here is product 2 with varient B
class ConcreteProduct2B implements AbstractProduct2 {
    public operation2(): string {
        return 'Concrete Product 2 with varient B'
    }

    // Here we can work with Concrete Product 1 with out worrying about the varients being incompatable
    public anotherOperation2(otherProduct: AbstractProduct1): string {
        const result = otherProduct.operation1()
        return 'The result of Concrete Product 2 with varient B working with product 1 is ' + result
    }
}

/**
 * The client code works with factories and products only through their abstract
 * types: AbstractFactory and AbstractProduct. This allows you to pass a factory to
 * the client, thus all products in the client will be of the same varient since they 
 * will all be made in the same factory.
 */
function clientCode(factory: AbstractFactory) {
    const product1 = factory.createProduct1();
    const product2 = factory.createProduct2();

    console.log('Creating... ' + product1.operation1());
    console.log('Creating... ' + product2.operation2());
    console.log(product2.anotherOperation2(product1));
}

// The client code is able to work with any factory type thus ensuring all products are of same varient in client code
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactoryA());
console.log('Note all products from the first factory are of varient A')

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactoryB());
console.log('Note all products from the first factory are of varient B')