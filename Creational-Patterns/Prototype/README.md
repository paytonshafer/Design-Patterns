# Prototype Pattern
This directory contains examples of the Prototype design pattern implemented in TypeScript. The Prototype pattern allows you to create new objects by copying an existing object, known as the prototype, and customizing them as needed. This is used when you want to create new objects that are similar to existing objects without specifying their exact class. It's particularly useful when the cost of creating an object is more expensive than copying an existing one. We provide TypeScript examples that demonstrate how to use the Prototype pattern to create objects based on prototype instances and a prototype registry to manage commonaly used prototypes. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
In this example we are dealing with shape prototypes. The three prototype classes are `Shape`, `Circle`, and `Rectangle` where `Circle` and `Rectangle` are subclasses of `Shape`. This example shows how to use an abstract parent class with a clone method and how to pass that down to the children. We also demo a prototype registry with the `ShapeCache` class. This class has a map that maps a string to a shape and supports adding and getting shapes to the map. The registry sends back a clone when one tries to get the shape.

<strong>NOTE</strong> that when compiling the file `copy-shapes.ts` you must use the library tag to denote the specific libraries we want to use which are the dom and es2015 ones. We need them both since this example uses a map which is available in es2015 and we need dom so that we can log to the console. To compile the file simply run the following command.

```bash
tsc --lib dom,es2015 copy-shapes.ts
```