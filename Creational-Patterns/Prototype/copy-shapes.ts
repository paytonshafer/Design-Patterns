abstract class Shape {
    public x: number;
    public y: number;
    public color: string;

    constructor();
    constructor(target: Shape);
    constructor(target?: Shape) {
        if (target) {
            this.x = target.x;
            this.y = target.y;
            this.color = target.color;
        }
    }

    public abstract clone(): Shape;

    public equals(object2: any): boolean {
        if (!(object2 instanceof Shape)) return false;
        const shape2: Shape = object2 as Shape;
        return shape2.x === this.x && shape2.y === this.y && shape2.color === this.color;
    }
}


class Circle extends Shape {
    public radius: Number;

    public constructor(target: Circle) {
        super(target)
        if(target != null){
            this.radius = target.radius
        }
    }
    
    public clone(): Shape{
        return new Circle(this)
    }

    public equals(obj2: Circle): boolean { // make object once we can cast Circle on obj2
        if(!super.equals(obj2)){ // check that obj2 is isntance of circle
            return false;
        }
        const shape2 = obj2; // need to ensuer circle cast to obj2
        return shape2.radius == this.radius
    }
}

class Rectangle extends Shape {
    public width: Number;
    public height: Number;

    public constructor(target: Rectangle){
        super(target)
        if(target != null){
            this.width = target.width
            this.height = target.height
        }
    }

    public clone(): Shape{
        return new Rectangle(this)
    }

    public equals(obj2: Rectangle): boolean { // make object once we can cast Rectangle on obj2
        if(!super.equals(obj2)){ // check that obj2 is isntance of Rectangle
            return false;
        }
        const shape2 = obj2; // need to ensuer Rectangle cast to obj2
        return shape2.width == this.width && shape2.height == this.height
    }

}

class ShapeCache {
    private cache: Map<string, Shape> = new Map<string, Shape>();
    
    // Constructor with some default shapes
    public constructor() {
        const circle = new Circle(Object());
        circle.x = 5;
        circle.y = 7;
        circle.radius = 45;
        circle.color = "Green";

        const rectangle = new Rectangle(Object());
        rectangle.x = 6;
        rectangle.y = 9;
        rectangle.width = 8;
        rectangle.height = 10;
        rectangle.color = "Blue";

        this.cache.set('Green Circle', circle)
        this.cache.set('Blue Rectangle', rectangle)
    }

    // Put function to add to hash map
    public put(key: string, shape: Shape) {
        this.cache.set(key, shape);
    }

    // Get function to get from hash map by string
    public get(key: string): Shape | undefined {
        return this.cache.get(key)?.clone();
    }
}

const demo = () => {
    console.log('Initailize Cache')
    const cache = new ShapeCache()

    console.log('Getting Green Circle From Cache')
    const green_circle = cache.get("Green Circle")
    console.log(green_circle)

    console.log("Creting new Shape 'Green Rectangle' and adding to cache")
    const rectangle = new Rectangle(Object());
    rectangle.x = 6;
    rectangle.y = 9;
    rectangle.width = 5;
    rectangle.height = 7;
    rectangle.color = "Green";
    cache.put("Green Retangle", rectangle)

    console.log('Getting Green Rectangle From Cache')
    const green_rect = cache.get("Green Retangle")
    console.log(green_rect)
}

demo()