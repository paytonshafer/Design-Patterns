// The base class, Component, declares common functionality of simple and complex objects
abstract class Component {
    protected parent!: Component | null;

    // In this case the base component can set functions for getting and setting the parent (optional)
    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    /**
     * In some cases it may be better to define the component management methods in the base
     * object as well, although not nessicary, it makes it so no concrete component classes 
     * are exposed to the client. The downside is that the leafs now have two empty functions.
     */
    public add(component: Component): void { }

    public remove(component: Component): void { }

    // It may also be useful to define a method for determining the type of component as well (optional)
    public isComposite(): boolean {
        return false;
    }

    // Here we initailzie some default behaivior both simple and complex have
    public abstract operation(): string;
}

/**
 * The leafe represents the simple object which is the 'end', leafs have no children.
 * Leafs often end up doing the actual 'work' for the client code
 */
class Leaf extends Component {
    public operation(): string {
        return 'Leaf';
    }
}

/**
 * The Composite represens the complex components who may have childes. They usually
 * delegate the actual 'work' to the childresn and then "sum-up" the result.
 */
class Composite extends Component {
    protected children: Component[] = [];

    // The class can add or remove any component to/from its list
    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    /**
     * The Composite executes its primary logic in a particular way. It
     * traverses recursively through all its children, collecting and summing
     * their results. Since the composite's children pass these calls to their
     * children and so forth, the whole object tree is traversed as a result.
     */
    public operation(): string {
        const results: string[] = [];
        for (const child of this.children) {
            results.push(child.operation());
        }

        return `Branch(${results.join('+')})`;
    }
}

// Client code working with objects via base interface
function clientCode(component: Component) {
    console.log(`RESULT: ${component.operation()}`);
}

// Client code with simple leaf:
const simple = new Leaf();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

// with complex componenet:
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');

// Due to child management in base class the client can work with componenets while never knowing the concrete class
function clientCode2(component1: Component, component2: Component) {

    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log(`RESULT: ${component1.operation()}`);
}

console.log('Client: I don\'t need to check the components classes even when managing the tree:');
clientCode2(tree, simple);