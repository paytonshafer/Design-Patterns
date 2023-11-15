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
// The target defins the first domain specific interface that will be used and need the adapter
var Target = /** @class */ (function () {
    function Target() {
    }
    Target.prototype.request = function () {
        return 'Target: The default target\'s behavior.';
    };
    return Target;
}());
/**
 * The Adaptee contains some behavior that the client wants to use and may be useful.
 * But, the interface is incompatible so our normal Target can not communicate with this.
 */
var Adaptee = /** @class */ (function () {
    function Adaptee() {
    }
    Adaptee.prototype.specificRequest = function () {
        // This returns something that our orignal interface would not understand (represented by backwards text)
        return '.eetpadA eht fo roivaheb laicepS';
    };
    return Adaptee;
}());
// The adapter makes it so the target can be commpatible with the Adaptee, Note it extends the Target.
var Adapter = /** @class */ (function (_super) {
    __extends(Adapter, _super);
    function Adapter(adaptee) {
        var _this = _super.call(this) || this;
        _this.adaptee = adaptee;
        return _this;
    }
    // This function calls the useful function from the Adaptee and convets it to something the client/Target can understand
    Adapter.prototype.request = function () {
        var result = this.adaptee.specificRequest().split('').reverse().join('');
        return "Adapter: (TRANSLATED) ".concat(result);
    };
    return Adapter;
}(Target));
// Client class that uses target interface
function clientCode(target) {
    console.log(target.request());
}
console.log('Client: I can work with Target objects:');
var target = new Target();
clientCode(target);
console.log('');
var adaptee = new Adaptee();
console.log('Client: The Adaptee class has an interface I do not understand:');
console.log("Adaptee: ".concat(adaptee.specificRequest()));
console.log('');
console.log('Client: With the Adapter I can understand the Adaptee:');
var adapter = new Adapter(adaptee);
clientCode(adapter);
