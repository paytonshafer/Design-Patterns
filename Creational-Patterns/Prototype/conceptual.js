var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * This is an example class with cloning ability. We will see how cloning works with values of different types
 */
var Prototype = /** @class */ (function () {
    function Prototype() {
    }
    Prototype.prototype.clone = function () {
        var clone = Object.create(this);
        clone.component = this.component;
        /**
         * Cloning this object will require an extra step since we have a object with back reference.
         * We want the nested object to point to the clone instead of the old object.
         * The spread operator comes in handy when preforming this task.
         */
        clone.circularReference = __assign(__assign({}, this.circularReference), { prototype: __assign({}, this) });
        return clone;
    };
    return Prototype;
}());
// Object with back reference
var ComponentWithBackReference = /** @class */ (function () {
    function ComponentWithBackReference(prototype) {
        this.prototype = prototype;
    }
    return ComponentWithBackReference;
}());
/**
 * This class is our prototype registry where we hold object that we want to clone often.
 * It supports methods to add to the registry and to get an object by its primitive value (and return its clone).
 */
var PrototypeRegistry = /** @class */ (function () {
    function PrototypeRegistry() {
        this.items = [];
    }
    PrototypeRegistry.prototype.addItem = function (p) {
        this.items.push(p);
    };
    PrototypeRegistry.prototype.getByPrimitive = function (prim) {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.primitive === prim) {
                return element.clone();
            }
        }
        return undefined;
    };
    return PrototypeRegistry;
}());
// Here is where we test cloning checking that each element of the clone is carried over/redefined correctly.
var testSimpleClone = function () {
    var p1 = new Prototype();
    p1.primitive = 300;
    p1.component = new Date(2002, 6, 1, 15, 2, 0, 0);
    p1.circularReference = new ComponentWithBackReference(p1);
    var p2 = p1.clone();
    if (p1.primitive === p2.primitive) {
        console.log("".concat(p1.primitive, " = ").concat(p2.primitive));
        console.log('Primitive field values have been carried over to a clone. Yay!');
    }
    else {
        console.log('Primitive field values have not been copied. Booo!');
    }
    if (p1.component === p2.component) {
        console.log("".concat(p1.component, " = ").concat(p2.component));
        console.log('Simple component has been cloned. Yay!');
    }
    else {
        console.log('Simple component has not been cloned. Booo!');
    }
    if (p1.circularReference === p2.circularReference) {
        console.log('Component with back reference has not been cloned. Booo!');
    }
    else {
        console.log('Component with back reference has been cloned. Yay!');
    }
    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log('Component with back reference is linked to original object. Booo!');
    }
    else {
        console.log('Component with back reference is linked to the clone. Yay!');
    }
};
// Here we test the prototype registry by adding some objects then getting a clone to ensure thet are in there.
var testRegistryUse = function () {
    var _a, _b;
    var registry = new PrototypeRegistry();
    var p1 = new Prototype();
    p1.primitive = 300;
    p1.component = new Date(2002, 6, 1, 15, 2, 0, 0);
    var p2 = new Prototype();
    p2.primitive = 200;
    p2.component = new Date(2020, 8, 21, 0, 0, 0, 0);
    console.log('Adding Prototype 1 to the registry');
    registry.addItem(p1);
    console.log('Adding Prototype 2 to the registry');
    registry.addItem(p2);
    console.log('Get Clone of Prototype 1 from the registry by primitive value and show component:');
    console.log((_a = registry.getByPrimitive(200)) === null || _a === void 0 ? void 0 : _a.component);
    console.log('Get Clone of Prototype 2 from the registry by primitive value and show component:');
    console.log((_b = registry.getByPrimitive(300)) === null || _b === void 0 ? void 0 : _b.component);
};
// Run client code
testSimpleClone();
console.log();
testRegistryUse();
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
