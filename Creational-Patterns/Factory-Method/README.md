# Factory Method Pattern
This directory contains examples of the Factory Method design pattern implemented in TypeScript. The Factory Method is a creational design pattern that provides an interface for creating objects but allows subclasses to alter the type of objects that will be created. This pattern is used when a class does not know the type of objects it needs to create. Instead of directly creating objects, it defines an interface (or abstract class) for creating objects. Subclasses that inherit from this interface provide concrete implementations for object creation. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
For the facroty method pattern the real world example to demonsrate is sending mail. The base mail class (creator class with factory method) will have two subclasses named `AirMail` and `GroundMail`. The transport classes (product with different instances) are `Plane`, `Train`, and `Truck`. The `AirMail` subclass will only use the `Plane` transport but the `GroundMail` needs to use the `Train` and `Truck` transport. Since the `GroundMail` subclass needs to use two different transports the client code passes an agrument to decide which transport method it will use.
