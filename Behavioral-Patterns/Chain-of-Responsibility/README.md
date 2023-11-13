# Chain of Responsibility Pattern
This directory contains examples of the Chain of Responsibility design pattern implemented in TypeScript. Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example is using middleware to preform certian checks when logging in a user. The abstract handler here is the `Middleware` class. This class sets the default chaining and chain management methods and the abstract 'handle' method (`check`). The two concrete handlers we have are `UserExistsMiddle` and `UserRoleMiddleware` which check if a user has an account on the server and checks what kind of user the client is, respectivly. We use both of these through our `server` object where when a user logs in we chain the checks using our concrete handler to determine if they have an account and what role they have.

<strong>NOTE</strong> that when compiling the file `auth-chain.ts` you must use the library tag to denote the specific libraries we want to use which are the dom and es2015 ones. We need them both since this example uses a map which is available in es2015 and we need dom so that we can log to the console. To compile the file simply run the following command.

```bash
tsc --lib dom,es2015 auth-chain.ts
```