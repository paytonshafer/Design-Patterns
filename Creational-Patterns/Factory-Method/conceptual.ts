/*
* This is the conceptual example of the Factory Method in TypeScript.
* You can either compile with something like tsc to turn to JavaSciprt
* or remove all types, replace abtract and interface with plain classes 
* and make abstract methods throw an error in the base case (the error will be thrown if not redefined).
*/

/*
* Creator Class declares that factory method that is supposed to return a 
* an object of the product class. The creator subclass provides the
* implemnation of said method.
*/
abstract class Creator {
    // Creater declaring factory method to be defined by subclass
    public abstract factoryMethod(): Product;

    /*
    * Here we have an operation for the creator class where it will use the product
    * The creator class is often to preform some kind of bussiness logic based on the product
    * The subclasses can then override the factory method to change said logic
    */
    public operation(): string {
        // Call the factory method to create the produc
        const product = this.factoryMethod()
        // Use of the product
        return `The same creator code creates ${product.operation()}`
    }
}


// Here is a concrete creator that overrides the factory method to craete a concrete product (A)
class ConcreteCreatorA extends Creator {
    // Note that the subclass still returns the abstract product, this way the Creator is independant of concrete product classes
    public factoryMethod(): Product {
        return new ConcreteProductA();
    }
}

// Here is another concrete creator that overrides the factory method to craete a concrete product (B)
class ConcreteCreatorB extends Creator {
    // Note that the subclass still returns the abstract product, this way the Creator is independant of concrete product classes
    public factoryMethod(): Product {
        return new ConcreteProductB();
    }
}

/*
* The Product iterface declares the methods that all concrete products must contain (at minimum)
*/
interface Product {
    operation(): string;
}

// Concrete product A provides one way for Product implementation
class ConcreteProductA implements Product {
    public operation(): string {
        return 'results from Concrete Product A'
    }
}

// Concrete product B provides another way for Product implementation
class ConcreteProductB implements Product {
    public operation(): string {
        return 'results from Concrete Product B'
    }
}

/*
* The client code works as an instance of a concrete creator but through the base interface.
* Since it works with creator via base it can be passed any concrete creator
*/
function clientCode(creator: Creator) {
    console.log('Client: I am not aware of what creator class is being used');
    console.log(creator.operation());
}

// The Application can be launched with different creators based on config, env or anything!
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreatorA());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreatorB());