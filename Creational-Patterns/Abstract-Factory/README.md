# Factory Method Pattern
This directory contains examples of the Abstract Factory design pattern implemented in TypeScript. The Abstract Factory is a creational design pattern that provides an interface for creating families objects, related by a high-level concept, without specifying their concrete classes. This allows for families to have varients and it helps to ensure that the created objects are compatible with each other (meaning there is no mixing up of varients). The pattern has an interface for creating the families of objects. Concrete implementations create the specific variations of the object family.

If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example is for us to act as a furnature shop. We have 3 types of furniture being chair, sofa and table and each comes in one of three varients being victorian, modern and art deco. Since no one wants a mis-match of furnature styles in their house and we want to use the same interface to serve all customers the abstract factory is the perfect design pattern. We have an interface called `FurnitureFactory` which is implemented by 3 seperate concrete factories for each furnature style (varient). Each factory makes one varient of the product family. For example the `ModernFurnitureFactory` makes `ModernChar`, `ModernSofa`, and `ModernTable`. This ensures that whenever a customer orders furniture they will always get products of the same varient.

<strong>NOTE</strong> that when compiling the TypeScript there are 2 types of errors you can safely ignore that are listed below.
1. 'error TS2307: Cannot find module 'readline' or its corresponding type declarations.'
2. 'error TS2580: Cannot find name 'process'.'
