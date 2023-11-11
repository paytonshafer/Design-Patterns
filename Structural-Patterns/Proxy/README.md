# Proxy Pattern
This directory contains examples of the Proxy design pattern implemented in TypeScript. The Proxy pattern is a structural design pattern that provides a surrogate or placeholder for another object. It acts as an intermediary, controlling access to the original object.The Proxy pattern allows the creation of an object with the same interface as the original but with added behavior before or after forwarding requests to the actual object. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example I chose is using a proxy for auth when making a request to the backend. When a request is made with out the proxy the backend responds and does not know if the client is authorized. With the use of a proxy we are able to check if they are authorized so we know if the client can make the request or not.