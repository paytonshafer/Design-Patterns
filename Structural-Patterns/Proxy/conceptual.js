/**
 * The RealSubject contains some core business logic but the proccess may be sensitive
 * or too slow so a proxy can fix those without altering the real subject code.
 */
var RealSubject = /** @class */ (function () {
    function RealSubject() {
    }
    RealSubject.prototype.request = function () {
        console.log('RealSubject: Handling request.');
    };
    return RealSubject;
}());
// The Proxy uses the same interface as RealSubject
var Proxy = /** @class */ (function () {
    // The Proxy has a reference to the real subject
    function Proxy(realSubject) {
        this.realSubject = realSubject;
    }
    /**
     * Proxies are most commonly used for lazy loading, caching, logginf and controlling access.
     * It will preform on of those operations then pass the execution to the same method
     * of the linked RealSubject object for the actual bussiness logic.
     */
    Proxy.prototype.request = function () {
        if (this.proxyWork()) {
            this.realSubject.request();
            this.logAccess();
        }
    };
    // Example of checking access
    Proxy.prototype.proxyWork = function () {
        console.log('Proxy: Doing some work before request to real subject.');
        return true;
    };
    Proxy.prototype.logAccess = function () {
        console.log('Proxy: Logging the time of request.');
    };
    return Proxy;
}());
// The client works with all objects through the subject interface so it may work with proxies and real sibjects
function clientCode(subject) {
    subject.request();
}
console.log('Client: Executing the client code with a real subject:');
var realSubject = new RealSubject();
clientCode(realSubject);
console.log('');
console.log('Client: Executing the same client code with a proxy:');
var proxy = new Proxy(realSubject);
clientCode(proxy);
/* OUTPUT
Client: Executing the client code with a real subject:
RealSubject: Handling request.

Client: Executing the same client code with a proxy:
Proxy: Checking access prior to firing a real request.
RealSubject: Handling request.
*/ 
