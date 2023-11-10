# Decorator Pattern
This directory contains examples of the Decorator design pattern implemented in TypeScript. The Decorator Pattern is a structural design pattern that allows behavior to be added to individual objects, either statically or dynamically, without affecting the behavior of other objects from the same class. It is used to extend the functionality of classes in a flexible and reusable way. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example I chose to do is working with data, reading and writing to/from, files. The `DataSource` is the base component which all concrete componenets and the base decorator implement. The concrete implementation we have is `FileDataSource` which is a file for the data. Next we have our decorators. The base decorator is `DataSourceDecorator` which defines the basics of the decorator. Then our concrete decorator is `EncryptionDecorator` which writes encoded data and decodes read data. These classes are used with client funnctions that can write/read public data and write/read secret (using `EncryptionDecorator`) data.

<strong>NOTE</strong> to run this you must first run:
```bash
npm install
```
This ensures that `@types/node` is installed such that you can use `fs` which is required to work with files. After that is installed you can compile and run as normal.