# Visitor Pattern
This directory contains examples of the Visitor design pattern implemented in TypeScript. The Visitor pattern is a behavioral design pattern that enables the separation of algorithms from the objects they act upon. By doing so, it facilitates the addition of new operations or functionalities to existing objects without modifying their structure. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
This real world example is having shape classes and using a visitor to write them to xml format. The component interface `Shape` is implemented by three classes: `Dot`, `Circle`, and `Rectangle`. These three classes implement the accept method such that they call the correct visitor function to write them to XML. These visitor functions can be found in the `ToXMLVisitor` class which also has an export function to return the created XML.