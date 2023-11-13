# Command Pattern
This directory contains examples of the Command design pattern implemented in TypeScript. The Command pattern is a behavioral design pattern that transforms a request into a self-contained object, holding all details about the request. This enables the passing of requests as method arguments, facilitates the postponement or queuing of a request's execution, and supports the implementation of undoable operations. By decoupling the sender and reciver the Command pattern allows for flexibility of supporting diverse commands, great for command-based functionalities in applications. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example is a simple example of a clipboard with copy and paste commands. We have the `Command` interface to define the execute function. Next we have `Copy` and `Paste` which are the concrete commands. They both delegate their work to the `TextClipboard` object which is the reciver. The reciver controls the clipboard and by using the `Copy` and `Paste` objects one can interact with the clipboard.