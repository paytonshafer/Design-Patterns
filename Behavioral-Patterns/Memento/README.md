# Memento Pattern
This directory contains examples of the Memento design pattern implemented in TypeScript. Memento is a behavioral design pattern that enables the preservation and retrieval of an object's previous state, allowing for undo and redo functionalities. This pattern promotes encapsulation by ensuring that the object's internal details remain hidden during the process of state capture and restoration. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example I chose to implement is a super simple text editor. The editor can save the 'file' and then undo changes to revert back to older saved versions. The `TextFile` class represents the originator and has our bussiness logic to write the the 'file', save the 'file' and restore older version. The `Memento` interface is implemented by the `TextFileHistory` that can return the state and other data. Lastly our caretaker is teh `TextEditor` class which holds the file history and can be used to get a list of previous version and save the file.