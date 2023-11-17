// Component interaface declares the accept method that takes the base visiter interface
interface Component {
    accept(visitor: Visitor): void;
}

// Each concrete componenet must implement the accept method such that it calls the visitors method for this componenet class
class ConcreteComponentA implements Component {
    // Note the method has the name of the component in it.
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentA(this);
    }

    // There may also be methods specific to this class, the visitor can access these since they are aware of concrete class
    public exclusiveMethodOfConcreteComponentA(): string {
        return 'A';
    }
}

// Another concrete class
class ConcreteComponentB implements Component {
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentB(this);
    }

    public specialMethodOfConcreteComponentB(): string {
        return 'B';
    }
}

// Visiter interface declares a set of visiting methods for compoenet classes, note it deals with concrete classes
interface Visitor {
    visitConcreteComponentA(element: ConcreteComponentA): void;

    visitConcreteComponentB(element: ConcreteComponentB): void;
}

// Concrete Visitors implement several versions of the same algorithm, which can work with all concrete component classes.
class ConcreteVisitor1 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
    }
}

class ConcreteVisitor2 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
    }
}

// the client works with componenets never and visitors with out knowing concrete classes
function clientCode(components: Component[], visitor: Visitor) {
    for (const component of components) {
        component.accept(visitor);
    }
}

const components = [
    new ConcreteComponentA(),
    new ConcreteComponentB(),
];

console.log('The client code works with all visitors via the base Visitor interface:');
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log('');

console.log('The same client code can work with different types of visitors:');
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);

/* OUTPUT
The client code works with all visitors via the base Visitor interface:
A + ConcreteVisitor1
B + ConcreteVisitor1

The same client code can work with different types of visitors:
A + ConcreteVisitor2
B + ConcreteVisitor2
*/