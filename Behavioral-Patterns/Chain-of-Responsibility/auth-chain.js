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
// Abstract Handler
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    // Build chain with first middleware and make list of the rest
    Middleware.link = function (first) {
        var chain = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            chain[_i - 1] = arguments[_i];
        }
        var head = first;
        for (var _a = 0, chain_1 = chain; _a < chain_1.length; _a++) {
            var nextInChain = chain_1[_a];
            if (head) {
                head.next = nextInChain;
                head = nextInChain;
            }
        }
        return first;
    };
    // Run check in next object or finish if there is no next object
    Middleware.prototype.checkNext = function (email, password) {
        if (!this.next) {
            return true;
        }
        return this.next.check(email, password);
    };
    return Middleware;
}());
// Concreate handler
var UserExistsMiddleware = /** @class */ (function (_super) {
    __extends(UserExistsMiddleware, _super);
    function UserExistsMiddleware(server) {
        var _this = _super.call(this) || this;
        _this.server = server;
        return _this;
    }
    UserExistsMiddleware.prototype.check = function (email, password) {
        if (!this.server.hasEmail(email)) {
            console.log("This email is not registered!");
            return false;
        }
        if (!this.server.isValidPassword(email, password)) {
            console.log("Wrong password!");
            return false;
        }
        return _super.prototype.checkNext.call(this, email, password);
    };
    return UserExistsMiddleware;
}(Middleware));
// Concreate handler
var UserRoleMiddleware = /** @class */ (function (_super) {
    __extends(UserRoleMiddleware, _super);
    function UserRoleMiddleware() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRoleMiddleware.prototype.check = function (email, password) {
        if (email == "admin@example.com") {
            console.log("Hello, admin!");
            return true;
        }
        console.log("Hello, user!");
        return _super.prototype.checkNext.call(this, email, password);
    };
    return UserRoleMiddleware;
}(Middleware));
// Server object (acts as client class)
var Server = /** @class */ (function () {
    function Server() {
        this.users = new Map();
    }
    Server.prototype.setMiddleware = function (middleware) {
        this.middleware = middleware;
    };
    Server.prototype.login = function (email, password) {
        var _a;
        if ((_a = this.middleware) === null || _a === void 0 ? void 0 : _a.check(email, password)) {
            console.log("Authorization have been successful!");
            return true;
        }
        return false;
    };
    Server.prototype.register = function (email, password) {
        this.users.set(email, password);
    };
    Server.prototype.hasEmail = function (email) {
        return this.users.has(email);
    };
    Server.prototype.isValidPassword = function (email, password) {
        return this.users.get(email) === (password);
    };
    return Server;
}());
// Initialize and set defaults
var server = new Server();
server.register("admin@example.com", "admin_pass");
server.register("user@example.com", "user_pass");
// Link checks so client can run
var middleware = Middleware.link(new UserExistsMiddleware(server), new UserRoleMiddleware());
// set servers chain
server.setMiddleware(middleware);
console.log("Enter email: admin@example.com");
var email = 'admin@example.com';
console.log("Input password: admin_pass");
var password = 'admin_pass';
server.login(email, password);
console.log("\nEnter email: hello@example.com");
email = 'hello@example.com';
console.log("Input password: test");
password = 'test';
server.login(email, password);
console.log("\nEnter email: user@example.com");
email = 'user@example.com';
console.log("Input password: test");
password = 'test';
server.login(email, password);
console.log("\nEnter email: user@example.com");
email = 'user@example.com';
console.log("Input password: user_pass");
password = 'user_pass';
server.login(email, password);
