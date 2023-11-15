/**
 * This is the singleton class in which we want to always return the same instance whenever
 * we need to use/call the class. We do this with the getInstance function.
 */
var Singleton = /** @class */ (function () {
    // To ensure the new operator can not be used we make the constructor private
    function Singleton() {
    }
    // This function ensures the single instance returning a new one the first time and getting the old one every other time
    Singleton.getInstance = function () {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    };
    // Some logic done by the business
    Singleton.prototype.someBusinessLogic = function () {
        // ...
    };
    return Singleton;
}());
function clientCode() {
    var s1 = Singleton.getInstance();
    var s2 = Singleton.getInstance();
    if (s1 === s2) {
        console.log('Singleton works, both variables contain the same instance.');
    }
    else {
        console.log('Singleton failed, variables contain different instances.');
    }
}
clientCode();
