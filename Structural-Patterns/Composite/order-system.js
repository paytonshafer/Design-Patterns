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
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    Component.prototype.getParent = function () {
        return this.parent;
    };
    Component.prototype.add = function (component) { };
    Component.prototype.remove = function (component) { };
    Component.prototype.isComposite = function () {
        return false;
    };
    return Component;
}());
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product(price, name) {
        var _this = _super.call(this) || this;
        _this.price = price;
        _this.name = name;
        return _this;
    }
    Product.prototype.getPrice = function () {
        return this.price;
    };
    Product.prototype.orderList = function () {
        return this.name;
    };
    return Product;
}(Component));
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        return _this;
    }
    // The class can add or remove any component to/from its list
    Box.prototype.add = function (component) {
        this.children.push(component);
        component.setParent(this);
    };
    Box.prototype.remove = function (component) {
        var componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);
        component.setParent(null);
    };
    Box.prototype.isComposite = function () {
        return true;
    };
    Box.prototype.getPrice = function () {
        var sum = 0;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            sum += child.getPrice();
        }
        return sum;
    };
    Box.prototype.orderList = function () {
        var results = [];
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            results.push(child.orderList());
        }
        return "Box containg(".concat(results.join(', '), ")");
    };
    return Box;
}(Component));
function getTotal(comp) {
    console.log("Total: $".concat(comp.getPrice()));
}
function getOrder(comp) {
    console.log("Order: ".concat(comp.orderList()));
}
console.log("Client: order just a Hammer");
var hammer = new Product(10, 'Hammer');
getOrder(hammer);
getTotal(hammer);
console.log();
console.log("Client: order a Drill, Hammer, Nails and Screws");
var box1 = new Box();
var smallbox1 = new Box();
smallbox1.add(new Product(5, 'Nails'));
smallbox1.add(new Product(5, 'Screws'));
var smallbox2 = new Box();
smallbox2.add(hammer);
box1.add(smallbox1);
box1.add(smallbox2);
box1.add(new Product(25, "Drill"));
getOrder(box1);
getTotal(box1);
