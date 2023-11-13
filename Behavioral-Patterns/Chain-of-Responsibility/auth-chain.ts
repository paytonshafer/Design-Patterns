// Abstract Handler
abstract class Middleware {
    private next: Middleware;

    // Build chain with first middleware and make list of the rest
    public static link(first: Middleware, ...chain: Middleware[]): Middleware {
        let head: Middleware | undefined = first;
        for (const nextInChain of chain) {
            if (head) {
                head.next = nextInChain;
                head = nextInChain;
            }
        }
        return first;
    }

    public abstract check(email: string, password: string): boolean;

    // Run check in next object or finish if there is no next object
    protected checkNext(email: string, password: string): boolean {
        if (!this.next) {
            return true;
        }
        return this.next.check(email, password);
    }
}

// Concreate handler
class UserExistsMiddleware extends Middleware {
    private server: Server;

    public constructor(server: Server){
        super()
        this.server = server;
    }

    public check(email: string, password: string): boolean {
        if (!this.server.hasEmail(email)) {
            console.log("This email is not registered!");
            return false;
        }
        if (!this.server.isValidPassword(email, password)) {
            console.log("Wrong password!");
            return false;
        }
        return super.checkNext(email, password);
    }

}

// Concreate handler
class UserRoleMiddleware extends Middleware {
    public check(email: string, password: string): boolean {
        if (email == "admin@example.com") {
            console.log("Hello, admin!");
            return true;
        }
        console.log("Hello, user!");
        return super.checkNext(email, password);
    }
}

// Server object (acts as client class)
class Server {
    private users: Map<string, string> = new Map();
    private middleware?: Middleware;

    public setMiddleware(middleware: Middleware): void {
        this.middleware = middleware
    }

    public login(email: string, password: string): boolean {
        if (this.middleware?.check(email, password)) {
            console.log("Authorization have been successful!");

            return true;
        }
        return false;
    }

    public register(email: string, password: string): void{
        this.users.set(email, password);
    }

    public hasEmail(email: string):boolean {
        return this.users.has(email);
    }

    public isValidPassword(email: string, password: string):boolean {
        return this.users.get(email) === (password);
    }
}

// Initialize and set defaults
const server = new Server();
server.register("admin@example.com", "admin_pass");
server.register("user@example.com", "user_pass");

// Link checks so client can run
const middleware = Middleware.link(
    new UserExistsMiddleware(server),
    new UserRoleMiddleware()
);

// set servers chain
server.setMiddleware(middleware);

console.log("Enter email: admin@example.com");
let email = 'admin@example.com';
console.log("Input password: admin_pass");
let password = 'admin_pass'
server.login(email, password);


console.log("\nEnter email: hello@example.com");
email = 'hello@example.com';
console.log("Input password: test");
password = 'test'
server.login(email, password);

console.log("\nEnter email: user@example.com");
email = 'user@example.com';
console.log("Input password: test");
password = 'test'
server.login(email, password);

console.log("\nEnter email: user@example.com");
email = 'user@example.com';
console.log("Input password: user_pass");
password = 'user_pass'
server.login(email, password);

/* OUTPUT
Enter email: admin@example.com
Input password: admin_pass
Hello, admin!
Authorization have been successful!

Enter email: hello@example.com
Input password: test
This email is not registered!

Enter email: user@example.com
Input password: test
Wrong password!

Enter email: user@example.com
Input password: user_pass
Hello, user!
Authorization have been successful!
*/