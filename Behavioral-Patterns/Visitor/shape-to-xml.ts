// Component interface
interface Shape {
    draw(): void
    accept(visitor: Visitor): void
}

// Concrete Component
class Dot implements Shape {
    private id: number
    private x: number
    private y: number

    public constructor(id?: number, x?:number, y?:number){
        id ? this.id = id : null
        x ? this.x = x : null
        y ? this.y = y : null
    }

    public getId(): number {
        return this.id
    }

    public getX(): number {
        return this.x
    }

    public getY(): number {
        return this.y
    }

    public draw(): void {
        console.log('Drawing Dot!')
    }

    public accept(visitor: Visitor): string {
        return visitor.visitDot(this)
    }
}

// Concrete Component
class Circle implements Shape {
    private id: number
    private x: number
    private y: number
    private radius: number

    public constructor(id?: number, x?:number, y?:number, radius?: number){
        id ? this.id = id : null
        x ? this.x = x : null
        y ? this.y = y : null
        radius ? this.radius = radius : null
    }

    public getId(): number {
        return this.id
    }

    public getX(): number {
        return this.x
    }

    public getY(): number {
        return this.y
    }

    public getRadius(): number {
        return this.radius
    }

    public draw(): void {
        console.log('Drawing Circle!')
    }

    public accept(visitor: Visitor): string {
        return visitor.visitCircle(this)
    }
}

// Concrete Component
class Rectangle implements Shape {
    private id: number
    private x: number
    private y: number
    private width: number
    private height: number

    public constructor(id?: number, x?:number, y?:number, width?: number, height?: number){
        id ? this.id = id : null
        x ? this.x = x : null
        y ? this.y = y : null
        width ? this.width = width : null
        height ? this.height = height : null
    }

    public getId(): number {
        return this.id
    }

    public getX(): number {
        return this.x
    }

    public getY(): number {
        return this.y
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public draw(): void {
        console.log('Drawing Rectangle!')
    }

    public accept(visitor: Visitor): string {
        return visitor.visitRectangle(this)
    }
}

// Visitor interface 
interface Visitor {
    visitDot(dot: Dot): string

    visitCircle(circle: Circle): string

    visitRectangle(rectangle: Rectangle): string
}

// Concrete visitor
class ToXMLVisitor implements Visitor {

    public export(args: Shape[]): string{
        let result = ''
        result += "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + "\n"
        for(const shape of args){
            result += shape.accept(this) + "\n"
        }
        return result
    }

    visitDot(d: Dot): string {
        return "<dot>" + "\n" +
                "    <id>" + d.getId() + "</id>" + "\n" +
                "    <x>" + d.getX() + "</x>" + "\n" +
                "    <y>" + d.getY() + "</y>" + "\n" +
                "</dot>";
    }

    visitCircle(c: Circle): string {
        return "<circle>" + "\n" +
                "    <id>" + c.getId() + "</id>" + "\n" +
                "    <x>" + c.getX() + "</x>" + "\n" +
                "    <y>" + c.getY() + "</y>" + "\n" +
                "    <radius>" + c.getRadius() + "</radius>" + "\n" +
                "</circle>";
    }

    visitRectangle(r: Rectangle): string {
        return "<rectangle>" + "\n" +
                "    <id>" + r.getId() + "</id>" + "\n" +
                "    <x>" + r.getX() + "</x>" + "\n" +
                "    <y>" + r.getY() + "</y>" + "\n" +
                "    <width>" + r.getWidth() + "</width>" + "\n" +
                "    <height>" + r.getHeight() + "</height>" + "\n" +
                "</rectangle>";
    }

}

// You could do another concrete visitor that exports to HTML

// Client code
const dot = new Dot(1, 10, 55);
const circle = new Circle(2, 23, 15, 10);
const rectangle = new Rectangle(3, 10, 17, 20, 30);

const shapes = [dot, circle, rectangle]
const exportVisitor = new ToXMLVisitor();
console.log(exportVisitor.export(shapes));

/* OUTPUT
<?xml version="1.0" encoding="utf-8"?>
<dot>
    <id>1</id>
    <x>10</x>
    <y>55</y>
</dot>
<circle>
    <id>2</id>
    <x>23</x>
    <y>15</y>
    <radius>10</radius>
</circle>
<rectangle>
    <id>3</id>
    <x>10</x>
    <y>17</y>
    <width>20</width>
    <height>30</height>
</rectangle>
*/