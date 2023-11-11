// Real Subject is a request to the backend
var BackendRequest = /** @class */ (function () {
    function BackendRequest() {
    }
    BackendRequest.prototype.request = function (auth) {
        if (auth) {
            console.log('Backend: Handling request of authorized user.');
        }
        else {
            console.log('Backend: Handling request, no idea if this user is authorized.');
        }
    };
    return BackendRequest;
}());
// The Proxy uses the same interface as _ and is used to check auth before a request
var AuthProxy = /** @class */ (function () {
    // The Proxy has a reference to the real subject
    function AuthProxy(backend) {
        this.backend = backend;
    }
    AuthProxy.prototype.request = function (auth) {
        if (this.checkAccess()) {
            this.backend.request(true);
            this.logAccess();
        }
    };
    // Example of checking access
    AuthProxy.prototype.checkAccess = function () {
        console.log('Proxy: Checking access prior to firing a real request.');
        return true;
    };
    AuthProxy.prototype.logAccess = function () {
        console.log('Proxy: Logging the user who made the request.');
    };
    return AuthProxy;
}());
// client code
function clientCode(subject) {
    subject.request(false);
}
console.log('Client: Executing the client code with a real subject:');
var realSubject = new BackendRequest();
clientCode(realSubject);
console.log('');
console.log('Client: Executing the same client code with a proxy:');
var proxy = new AuthProxy(realSubject);
clientCode(proxy);
/* OUTPUT

*/ 
