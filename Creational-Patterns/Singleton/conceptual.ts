/**
 * This is the singleton class in which we want to always return the same instance whenever
 * we need to use/call the class. We do this with the getInstance function.
 */
class Singleton {
    private static instance: Singleton;

    // To ensure the new operator can not be used we make the constructor private
    private constructor() { }

    // This function ensures the single instance returning a new one the first time and getting the old one every other time
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    // Some logic done by the business
    public someBusinessLogic() {
        // ...
    }
}

function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log('Singleton works, both variables contain the same instance.');
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();