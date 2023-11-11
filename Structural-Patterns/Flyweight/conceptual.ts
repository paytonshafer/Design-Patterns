/**
 * The flighweight stores the shared state that may belong to more than one entity.
 * It then accepts rest of the state, the unique portion, by methods parameters.
 */
class Flyweight {
    private sharedState: any;

    constructor(sharedState: any) {
        this.sharedState = sharedState;
    }

    public operation(uniqueState: any): void {
        const s = JSON.stringify(this.sharedState);
        const u = JSON.stringify(uniqueState);
        console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
    }
}

/**
 * The Flyweight Factory is in chaarge of creating and managing the flyweight objects.
 * When a client requests a flyweight it either returns the instance or creates a new one.
 */
class FlyweightFactory {
    private flyweights: {[key: string]: Flyweight} = <any>{};

    constructor(initialFlyweights: string[][]) {
        for (const state of initialFlyweights) {
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }

    // Returns string hash when given a state
    private getKey(state: string[]): string {
        return state.join('_');
    }

    // Given a state it either returns it or creates a new one
    public getFlyweight(sharedState: string[]): Flyweight {
        const key = this.getKey(sharedState);

        if (!(key in this.flyweights)) {
            console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
            this.flyweights[key] = new Flyweight(sharedState);
        } else {
            console.log('FlyweightFactory: Reusing existing flyweight.');
        }

        return this.flyweights[key];
    }

    public listFlyweights(): void {
        const count = Object.keys(this.flyweights).length;
        console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

// Client usually starts with common preinitialized flyweights
const factory = new FlyweightFactory([
    ['shared1a', 'shared1b'],
    ['shared2a', 'shared2b'],
]);
factory.listFlyweights();

console.log(`\nClient: Adding an instance.`)
const flyweight1 = factory.getFlyweight(['shared1a', 'shared1b']);
// The client code has the ubique values and passes them to the flywight.
flyweight1.operation(['unique1a', 'unique1b'])

console.log(`\nClient: Adding an instance.`)
const flyweight2 = factory.getFlyweight(['shared3a', 'shared3b']);
flyweight2.operation(['unique3a', 'unique3b'])

factory.listFlyweights();

/* OUTPUT
FlyweightFactory: I have 2 flyweights:
shared1a_shared1b
shared2a_shared2b

Client: Adding an instance.
FlyweightFactory: Reusing existing flyweight.
Flyweight: Displaying shared (["shared1a","shared1b"]) and unique (["unique1a","unique1b"]) state.

Client: Adding an instance.
FlyweightFactory: Can't find a flyweight, creating new one.
Flyweight: Displaying shared (["shared3a","shared3b"]) and unique (["unique3a","unique3b"]) state.

FlyweightFactory: I have 3 flyweights:
shared1a_shared1b
shared2a_shared2b
shared3a_shared3b
*/