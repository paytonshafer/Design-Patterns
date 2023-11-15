// Subject interface
interface Subject {
    request(auth: boolean): void;
}

// Real Subject is a request to the backend
class BackendRequest implements Subject {
    public request(auth: boolean): void {
        if(auth){
            console.log('Backend: Handling request of authorized user.');
        } else {
            console.log('Backend: Handling request, no idea if this user is authorized.');
        }
    }
}

// The Proxy uses the same interface as _ and is used to check auth before a request
class AuthProxy implements Subject {
    private backend: BackendRequest;

    // The Proxy has a reference to the real subject
    constructor(backend: BackendRequest) {
        this.backend = backend;
    }

    public request(auth: boolean): void {
        if (this.checkAccess()) {
            this.backend.request(true);
            this.logAccess();
        }
    }

    // Example of checking access
    private checkAccess(): boolean {
        console.log('Proxy: Checking access prior to firing a real request.');

        return true;
    }

    private logAccess(): void {
        console.log('Proxy: Logging the user who made the request.');
    }
}

// client code
function clientCode(subject: Subject) {
    subject.request(false);
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new BackendRequest();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new AuthProxy(realSubject);
clientCode(proxy);

/* OUTPUT
Client: Executing the client code with a real subject:
Backend: Handling request, no idea if this user is authorized.

Client: Executing the same client code with a proxy:
Proxy: Checking access prior to firing a real request.
Backend: Handling request of authorized user.
*/