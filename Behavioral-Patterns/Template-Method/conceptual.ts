/**
 * AbstractClass defines a template method with a skeleton of some algorithm composed of calls 
 * to abstract operations, the concrete subclass implements these and do not touch the template method.
 */
abstract class AbstractClass {
    // Template method defines skeleton of an algorithm
    public templateMethod(): void {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.requiredOperation2();
        this.baseOperation3();
        this.hook2();
    }

    // Operations implemented by Abstract class (these would remain the same in the algorithm no matter what)
    protected baseOperation1(): void {
        console.log('AbstractClass says: I am doing the bulk of the work');
    }

    protected baseOperation2(): void {
        console.log('AbstractClass says: But I let subclasses override some operations');
    }

    protected baseOperation3(): void {
        console.log('AbstractClass says: But I am doing the bulk of the work anyway');
    }

    // Operations for the subclass, these are done differently by each client
    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    /**
     * The 'hooks' are optional functions for subclasses to override since they have a default, but empty, implementation.
     * They can provide additional points for crucial places inside the algorithm.
     */
    protected hook1(): void { }

    protected hook2(): void { }
}

// Concrete classes have to implement abstract operations of base class, they can optionaly override some operations
class ConcreteClass1 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('ConcreteClass1 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('ConcreteClass1 says: Implemented Operation2');
    }
}

// Concrete class
class ConcreteClass2 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('ConcreteClass2 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('ConcreteClass2 says: Implemented Operation2');
    }

    protected hook1(): void {
        console.log('ConcreteClass2 says: Overridden Hook1');
    }
}

/**
 * The client code calls the template method to execute the algorithm. Client
 * code does not have to know the concrete class of an object it works with, as
 * long as it works with objects through the interface of their base class.
 */
// Client code calls template method but works with abstract class so it is unaware of the concrete class.
function clientCode(abstractClass: AbstractClass) {
    abstractClass.templateMethod();
}

console.log('The Same client code can work with different subclasses:');
console.log('Concrete Class 1:');
clientCode(new ConcreteClass1());
console.log('');
console.log('Concrete Class 2:');
clientCode(new ConcreteClass2());

/* OUTPUT
The Same client code can work with different subclasses:
Concrete Class 1:
AbstractClass says: I am doing the bulk of the work
ConcreteClass1 says: Implemented Operation1
AbstractClass says: But I let subclasses override some operations
ConcreteClass1 says: Implemented Operation2
AbstractClass says: But I am doing the bulk of the work anyway

Concrete Class 2:
AbstractClass says: I am doing the bulk of the work
ConcreteClass2 says: Implemented Operation1
AbstractClass says: But I let subclasses override some operations
ConcreteClass2 says: Overridden Hook1
ConcreteClass2 says: Implemented Operation2
AbstractClass says: But I am doing the bulk of the work anyway
*/