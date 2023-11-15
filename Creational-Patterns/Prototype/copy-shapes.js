var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape = /** @class */ (function () {
    function Shape(target) {
        if (target) {
            this.x = target.x;
            this.y = target.y;
            this.color = target.color;
        }
    }
    Shape.prototype.equals = function (object2) {
        if (!(object2 instanceof Shape))
            return false;
        var shape2 = object2;
        return shape2.x === this.x && shape2.y === this.y && shape2.color === this.color;
    };
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(target) {
        var _this = _super.call(this, target) || this;
        if (target != null) {
            _this.radius = target.radius;
        }
        return _this;
    }
    Circle.prototype.clone = function () {
        return new Circle(this);
    };
    Circle.prototype.equals = function (obj2) {
        if (!_super.prototype.equals.call(this, obj2)) { // check that obj2 is isntance of circle
            return false;
        }
        var shape2 = obj2; // need to ensuer circle cast to obj2
        return shape2.radius == this.radius;
    };
    return Circle;
}(Shape));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(target) {
        var _this = _super.call(this, target) || this;
        if (target != null) {
            _this.width = target.width;
            _this.height = target.height;
        }
        return _this;
    }
    Rectangle.prototype.clone = function () {
        return new Rectangle(this);
    };
    Rectangle.prototype.equals = function (obj2) {
        if (!_super.prototype.equals.call(this, obj2)) { // check that obj2 is isntance of Rectangle
            return false;
        }
        var shape2 = obj2; // need to ensuer Rectangle cast to obj2
        return shape2.width == this.width && shape2.height == this.height;
    };
    return Rectangle;
}(Shape));
var ShapeCache = /** @class */ (function () {
    // Constructor with some default shapes
    function ShapeCache() {
        this.cache = new Map();
        var circle = new Circle(Object());
        circle.x = 5;
        circle.y = 7;
        circle.radius = 45;
        circle.color = "Green";
        var rectangle = new Rectangle(Object());
        rectangle.x = 6;
        rectangle.y = 9;
        rectangle.width = 8;
        rectangle.height = 10;
        rectangle.color = "Blue";
        this.cache.set('Green Circle', circle);
        this.cache.set('Blue Rectangle', rectangle);
    }
    // Put function to add to hash map
    ShapeCache.prototype.put = function (key, shape) {
        this.cache.set(key, shape);
    };
    // Get function to get from hash map by string
    ShapeCache.prototype.get = function (key) {
        var _a;
        return (_a = this.cache.get(key)) === null || _a === void 0 ? void 0 : _a.clone();
    };
    return ShapeCache;
}());
var demo = function () {
    console.log('Initailize Cache');
    var cache = new ShapeCache();
    console.log('Getting Green Circle From Cache');
    var green_circle = cache.get("Green Circle");
    console.log(green_circle);
    console.log("Creting new Shape 'Green Rectangle' and adding to cache");
    var rectangle = new Rectangle(Object());
    rectangle.x = 6;
    rectangle.y = 9;
    rectangle.width = 5;
    rectangle.height = 7;
    rectangle.color = "Green";
    cache.put("Green Retangle", rectangle);
    console.log('Getting Green Rectangle From Cache');
    var green_rect = cache.get("Green Retangle");
    console.log(green_rect);
};
demo();
