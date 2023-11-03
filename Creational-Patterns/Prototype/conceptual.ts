/**
 * This is an example class with cloning ability. We will see how cloning works with values of different types
 */
class Prototype {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    public clone(): this {
        const clone = Object.create(this)

        clone.component = this.component

        /**
         * Cloning this object will require an extra step since we have a object with back reference. 
         * We want the nested object to point to the clone instead of the old object.
         * The spread operator comes in handy when preforming this task. 
         */
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }
}

// Object with back reference
class ComponentWithBackReference {
    public prototype: Prototype;

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

/**
 * This class is our prototype registry where we hold object that we want to clone often.
 * It supports methods to add to the registry and to get an object by its primitive value (and return its clone).
 */
class PrototypeRegistry{
    private items: Prototype[] = [];

    addItem(p: Prototype){
        this.items.push(p)
    }

    getByPrimitive(prim: any): Prototype | undefined{
        for (const element of this.items) {
            if (element.primitive === prim) {
                return element.clone();
            }
        }
        return undefined;
    }
}

// Here is where we test cloning checking that each element of the clone is carried over/redefined correctly.
const testSimpleClone = () => {
    const p1 = new Prototype()
    p1.primitive = 300;
    p1.component = new Date(2002, 6, 1, 15, 2, 0, 0)
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone()

    if (p1.primitive === p2.primitive) {
        console.log(`${p1.primitive} = ${p2.primitive}`)
        console.log('Primitive field values have been carried over to a clone. Yay!');
    } else {
        console.log('Primitive field values have not been copied. Booo!');
    }

    if (p1.component === p2.component) {
        console.log(`${p1.component} = ${p2.component}`)
        console.log('Simple component has been cloned. Yay!');
    } else {
        console.log('Simple component has not been cloned. Booo!');
    }

    if (p1.circularReference === p2.circularReference) {
        console.log('Component with back reference has not been cloned. Booo!');
    } else {
        console.log('Component with back reference has been cloned. Yay!');
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log('Component with back reference is linked to original object. Booo!');
    } else {
        console.log('Component with back reference is linked to the clone. Yay!');
    }
}

// Here we test the prototype registry by adding some objects then getting a clone to ensure thet are in there.
const testRegistryUse = () => {
    const registry = new PrototypeRegistry()

    const p1 = new Prototype()
    p1.primitive = 300;
    p1.component = new Date(2002, 6, 1, 15, 2, 0, 0)

    const p2 = new Prototype()
    p2.primitive = 200;
    p2.component = new Date(2020, 8, 21, 0, 0, 0, 0)

    console.log('Adding Prototype 1 to the registry')
    registry.addItem(p1)
    console.log('Adding Prototype 2 to the registry')
    registry.addItem(p2)

    console.log('Get Clone of Prototype 1 from the registry by primitive value and show component:')
    console.log(registry.getByPrimitive(200)?.component)
    console.log('Get Clone of Prototype 2 from the registry by primitive value and show component:')
    console.log(registry.getByPrimitive(300)?.component)
}

// Run client code
testSimpleClone()
console.log()
testRegistryUse()

/*
OUTPUT:
300 = 300
Primitive field values have been carried over to a clone. Yay!
Mon Jul 01 2002 15:02:00 GMT-0400 (Eastern Daylight Time) = Mon Jul 01 2002 15:02:00 GMT-0400 (Eastern Daylight Time)
Simple component has been cloned. Yay!
Component with back reference has been cloned. Yay!
Component with back reference is linked to the clone. Yay!

Adding Prototype 1 to the registry
Adding Prototype 2 to the registry
Get Clone of Prototype 1 from the registry by primitive value and show component:
2020-09-21T04:00:00.000Z
Get Clone of Prototype 2 from the registry by primitive value and show component:
2002-07-01T19:02:00.000Z
*/