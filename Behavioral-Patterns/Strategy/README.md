# Strategy Pattern
This directory contains examples of the Strategy design pattern implemented in TypeScript. The Strategy Pattern is a behavioral design pattern that defines a family of interchangeable algorithms, encapsulates each algorithm, and makes them interchangeable. It enables a client to choose a specific algorithm from a family of algorithms at runtime.If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example is a simple payment system that uses two algorothms to pay. You can either pay with paypal or by credit card. The context uses these two algorithms with the Strategy pattern and the user decicdes how they want pay.

<strong>NOTE</strong> that when compiling the file `payment-method.ts` you must use the library tag to denote the specific libraries we want to use which are the dom and es2015 ones. We need them both since this example uses a map which is available in es2015 and we need dom so that we can log to the console. To compile the file simply run the following command.

```bash
tsc --lib dom,es2015 payment-method.ts
```

<strong>NOTE</strong> that when compiling the TypeScript there are 2 types of errors you can safely ignore that are listed below.
1. 'error TS2307: Cannot find module 'readline' or its corresponding type declarations.'
2. 'error TS2580: Cannot find name 'process'.'