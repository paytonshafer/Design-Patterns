/**
 * The Subject interface declares the common operations between the real subject (where
 * you really want to interact with) and the Proxy (the class that does the interacting).
 * A client using this interface can work with a proxy or real subject.
 */
interface Subject {
    request(): void;
}

/**
 * The RealSubject contains some core business logic but the proccess may be sensitive 
 * or too slow so a proxy can fix those without altering the real subject code.
 */
class RealSubject implements Subject {
    public request(): void {
        console.log('RealSubject: Handling request.');
    }
}

// The Proxy uses the same interface as RealSubject
class Proxy implements Subject {
    private realSubject: RealSubject;

    // The Proxy has a reference to the real subject
    constructor(realSubject: RealSubject) {
        this.realSubject = realSubject;
    }

    /**
     * Proxies are most commonly used for lazy loading, caching, logginf and controlling access. 
     * It will preform on of those operations then pass the execution to the same method
     * of the linked RealSubject object for the actual bussiness logic.
     */
    public request(): void {
        if (this.proxyWork()) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    // Example of checking access
    private proxyWork(): boolean {
        console.log('Proxy: Doing some work before request to real subject.');

        return true;
    }

    private logAccess(): void {
        console.log('Proxy: Logging the time of request.');
    }
}

// The client works with all objects through the subject interface so it may work with proxies and real sibjects
function clientCode(subject: Subject) {
    subject.request();
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new Proxy(realSubject);
clientCode(proxy);

/* OUTPUT
Client: Executing the client code with a real subject:
RealSubject: Handling request.

Client: Executing the same client code with a proxy:
Proxy: Doing some work before request to real subject.
RealSubject: Handling request.
*/