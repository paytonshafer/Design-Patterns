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
// The base class, Component, declares common functionality of simple and complex objects
var Component = /** @class */ (function () {
    function Component() {
    }
    // In this case the base component can set functions for getting and setting the parent (optional)
    Component.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    Component.prototype.getParent = function () {
        return this.parent;
    };
    /**
     * In some cases it may be better to define the component management methods in the base
     * object as well, although not nessicary, it makes it so no concrete component classes
     * are exposed to the client. The downside is that the leafs now have two empty functions.
     */
    Component.prototype.add = function (component) { };
    Component.prototype.remove = function (component) { };
    // It may also be useful to define a method for determining the type of component as well (optional)
    Component.prototype.isComposite = function () {
        return false;
    };
    return Component;
}());
/**
 * The leafe represents the simple object which is the 'end', leafs have no children.
 * Leafs often end up doing the actual 'work' for the client code
 */
var Leaf = /** @class */ (function (_super) {
    __extends(Leaf, _super);
    function Leaf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Leaf.prototype.operation = function () {
        return 'Leaf';
    };
    return Leaf;
}(Component));
/**
 * The Composite represens the complex components who may have childes. They usually
 * delegate the actual 'work' to the childresn and then "sum-up" the result.
 */
var Composite = /** @class */ (function (_super) {
    __extends(Composite, _super);
    function Composite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        return _this;
    }
    // The class can add or remove any component to/from its list
    Composite.prototype.add = function (component) {
        this.children.push(component);
        component.setParent(this);
    };
    Composite.prototype.remove = function (component) {
        var componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);
        component.setParent(null);
    };
    Composite.prototype.isComposite = function () {
        return true;
    };
    /**
     * The Composite executes its primary logic in a particular way. It
     * traverses recursively through all its children, collecting and summing
     * their results. Since the composite's children pass these calls to their
     * children and so forth, the whole object tree is traversed as a result.
     */
    Composite.prototype.operation = function () {
        var results = [];
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            results.push(child.operation());
        }
        return "Branch(".concat(results.join('+'), ")");
    };
    return Composite;
}(Component));
// Client code working with objects via base interface
function clientCode(component) {
    console.log("RESULT: ".concat(component.operation()));
}
// Client code with simple leaf:
var simple = new Leaf();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');
// with complex componenet:
var tree = new Composite();
var branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
var branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');
// Due to child management in base class the client can work with componenets while never knowing the concrete class
function clientCode2(component1, component2) {
    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log("RESULT: ".concat(component1.operation()));
}
console.log('Client: I don\'t need to check the components classes even when managing the tree:');
clientCode2(tree, simple);
