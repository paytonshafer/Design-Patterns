# Flyweight Pattern
This directory contains examples of the Flyweight design pattern implemented in TypeScript. The Flyweight is a structural design pattern that focuses on minimizing memory usage or computational expenses by sharing as much as possible with related objects. It achieves this by effectively dividing objects into shared (intrinsic) and unique (extrinsic) states. The shared states are stored centrally and reused across multiple objects, usually manages by a Flyweigth Factory, while the unique states are managed individually. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example is to use the Flyweight pattern to cache common car models for a car database. The `Flyweight` and `FlyweightFactory` act the same as in the conceptual example. We have a `cars` instance of `FlyweightFactory` that has some common models of cars in the database. We can then interact with `cars` to make and get flyweights.