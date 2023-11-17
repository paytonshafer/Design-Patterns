// Concrete Component
var Dot = /** @class */ (function () {
    function Dot(id, x, y) {
        id ? this.id = id : null;
        x ? this.x = x : null;
        y ? this.y = y : null;
    }
    Dot.prototype.getId = function () {
        return this.id;
    };
    Dot.prototype.getX = function () {
        return this.x;
    };
    Dot.prototype.getY = function () {
        return this.y;
    };
    Dot.prototype.draw = function () {
        console.log('Drawing Dot!');
    };
    Dot.prototype.accept = function (visitor) {
        return visitor.visitDot(this);
    };
    return Dot;
}());
// Concrete Component
var Circle = /** @class */ (function () {
    function Circle(id, x, y, radius) {
        id ? this.id = id : null;
        x ? this.x = x : null;
        y ? this.y = y : null;
        radius ? this.radius = radius : null;
    }
    Circle.prototype.getId = function () {
        return this.id;
    };
    Circle.prototype.getX = function () {
        return this.x;
    };
    Circle.prototype.getY = function () {
        return this.y;
    };
    Circle.prototype.getRadius = function () {
        return this.radius;
    };
    Circle.prototype.draw = function () {
        console.log('Drawing Circle!');
    };
    Circle.prototype.accept = function (visitor) {
        return visitor.visitCircle(this);
    };
    return Circle;
}());
// Concrete Component
var Rectangle = /** @class */ (function () {
    function Rectangle(id, x, y, width, height) {
        id ? this.id = id : null;
        x ? this.x = x : null;
        y ? this.y = y : null;
        width ? this.width = width : null;
        height ? this.height = height : null;
    }
    Rectangle.prototype.getId = function () {
        return this.id;
    };
    Rectangle.prototype.getX = function () {
        return this.x;
    };
    Rectangle.prototype.getY = function () {
        return this.y;
    };
    Rectangle.prototype.getWidth = function () {
        return this.width;
    };
    Rectangle.prototype.getHeight = function () {
        return this.height;
    };
    Rectangle.prototype.draw = function () {
        console.log('Drawing Rectangle!');
    };
    Rectangle.prototype.accept = function (visitor) {
        return visitor.visitRectangle(this);
    };
    return Rectangle;
}());
// Concrete visitor
var ToXMLVisitor = /** @class */ (function () {
    function ToXMLVisitor() {
    }
    ToXMLVisitor.prototype.export = function (args) {
        var result = '';
        result += "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + "\n";
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var shape = args_1[_i];
            result += shape.accept(this) + "\n";
        }
        return result;
    };
    ToXMLVisitor.prototype.visitDot = function (d) {
        return "<dot>" + "\n" +
            "    <id>" + d.getId() + "</id>" + "\n" +
            "    <x>" + d.getX() + "</x>" + "\n" +
            "    <y>" + d.getY() + "</y>" + "\n" +
            "</dot>";
    };
    ToXMLVisitor.prototype.visitCircle = function (c) {
        return "<circle>" + "\n" +
            "    <id>" + c.getId() + "</id>" + "\n" +
            "    <x>" + c.getX() + "</x>" + "\n" +
            "    <y>" + c.getY() + "</y>" + "\n" +
            "    <radius>" + c.getRadius() + "</radius>" + "\n" +
            "</circle>";
    };
    ToXMLVisitor.prototype.visitRectangle = function (r) {
        return "<rectangle>" + "\n" +
            "    <id>" + r.getId() + "</id>" + "\n" +
            "    <x>" + r.getX() + "</x>" + "\n" +
            "    <y>" + r.getY() + "</y>" + "\n" +
            "    <width>" + r.getWidth() + "</width>" + "\n" +
            "    <height>" + r.getHeight() + "</height>" + "\n" +
            "</rectangle>";
    };
    return ToXMLVisitor;
}());
// You could do another concrete visitor that exports to HTML
var dot = new Dot(1, 10, 55);
var circle = new Circle(2, 23, 15, 10);
var rectangle = new Rectangle(3, 10, 17, 20, 30);
var shapes = [dot, circle, rectangle];
var exportVisitor = new ToXMLVisitor();
console.log(exportVisitor.export(shapes));
