/*
* This is a specific example of the factory method in TypeScript
* You can either compile with something like tsc to turn to JavaSciprt
* or remove all types, replace abtract and interface with plain classes
* and make abstract methods throw an error in the base case (the error will be thrown if not redefined).
*/
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
// Creator class with factory method
var Mail = /** @class */ (function () {
    function Mail() {
    }
    // our operation in this case is to deliver the mail
    Mail.prototype.deliverMail = function () {
        // create our prodect with certian method of transportation
        var method = this.methodOfTransportaiton();
        // use the product and deliver the mail
        return "The mail was ".concat(method.deliver(), " The mail is delivered using the same code no matter the method.");
    };
    return Mail;
}());
// Mail can be sent by air with 
var AirMail = /** @class */ (function (_super) {
    __extends(AirMail, _super);
    function AirMail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Set the factory method to create planes
    AirMail.prototype.methodOfTransportaiton = function () {
        return new Plane();
    };
    return AirMail;
}(Mail));
// Here is another concrete creator that overrides the factory method to craete a concrete product (B)
var GroundMail = /** @class */ (function (_super) {
    __extends(GroundMail, _super);
    // Get transportation mode from constructor
    function GroundMail(transport) {
        var _this = _super.call(this) || this;
        _this.selectedTransport = transport;
        return _this;
    }
    // Set the method to what was given
    GroundMail.prototype.methodOfTransportaiton = function () {
        return this.selectedTransport;
    };
    return GroundMail;
}(Mail));
// Concrete product delivered by plane
var Plane = /** @class */ (function () {
    function Plane() {
    }
    Plane.prototype.deliver = function () {
        return 'delivered by plane.';
    };
    return Plane;
}());
// Concrete product delivered by train
var Train = /** @class */ (function () {
    function Train() {
    }
    Train.prototype.deliver = function () {
        return 'delivered by train.';
    };
    return Train;
}());
// Concrete product delivered by truck
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.deliver = function () {
        return 'delivered by truck.';
    };
    return Truck;
}());
// Function representing client post office who sends out mail to be delivered
function postOffice(mailType, transport) {
    var mail; // Initalize mail object
    // Based on mail type create specific type of transportations
    if (mailType === 'AirMail') {
        mail = new AirMail();
    }
    else if (mailType === 'GroundMail') {
        mail = new GroundMail(transport);
    }
    else {
        throw new Error('Invalid mail type');
    }
    // Deliver the mail
    console.log(mail.deliverMail());
}
console.log('Sending mail by air.');
postOffice('AirMail', new Plane());
console.log('');
console.log('Sending mail by ground.');
postOffice('GroundMail', new Train());
postOffice('GroundMail', new Truck());
