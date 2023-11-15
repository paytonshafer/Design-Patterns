// Base
abstract class Component {
    protected parent!: Component | null;

    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    public add(component: Component): void { }

    public remove(component: Component): void { }

    public isComposite(): boolean {
        return false;
    }

    // Key Operations
    public abstract getPrice(): number;

    public abstract orderList(): string;
}

// Simple
class Product extends Component {
    private price: number;
    private name: string;

    public constructor(price: number, name: string){
        super()
        this.price = price;
        this.name = name;
    }

    public getPrice(): number {
        return this.price;
    }

    public orderList(): string {
        return this.name;
    }
}

// Complex
class Box extends Component {
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

    public getPrice(): number {
        let sum = 0;
        for(const child of this.children){
            sum += child.getPrice()
        }

        return sum
    }

    public orderList(): string {
        const results: string[] = [];
        for (const child of this.children) {
            results.push(child.orderList());
        }

        return `Box containg(${results.join(', ')})`;
    }
}

// Client code (Note that it doesnt know what concrete class it works with)
function getTotal(comp: Component){
    console.log(`Total: $${comp.getPrice()}`)
}

function getOrder(comp: Component){
    console.log(`Order: ${comp.orderList()}`)
}

console.log("Client: order just a Hammer")
const hammer = new Product(10, 'Hammer')
getOrder(hammer)
getTotal(hammer)
console.log()

console.log("Client: order a Drill, Hammer, Nails and Screws")
const box1 = new Box()
const smallbox1 = new Box()
smallbox1.add(new Product(5, 'Nails'))
smallbox1.add(new Product(5, 'Screws'))
const smallbox2 = new Box()
smallbox2.add(hammer)
box1.add(smallbox1)
box1.add(smallbox2)
box1.add(new Product(25, "Drill"))
getOrder(box1)
getTotal(box1)

/* OUTPUT
Client: order just a Hammer
Order: Hammer
Total: $10

Client: order a Drill, Hammer, Nails and Screws
Order: Box containg(Box containg(Nails, Screws), Box containg(Hammer), Drill)
Total: $45
*/