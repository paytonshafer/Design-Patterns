# Design Patterns in TypeScript

Welcome to the "Design Patterns in TypeScript" repository! In this project, you can explore various design patterns that provide conceptual as well as real-world examples of their implementation using TypeScript. This repository serves as a learning resource for developers interested in design patterns and TypeScript. Thank you for checking out this repository, this project was a way for me to learn popular design patterns while strenghtening my OOP and TypeScript skills. A great reasource for learning more about the design patterns in this repository and seeing examples in many top programming languages can be found [here](https://refactoring.guru/design-patterns).

## Table of Contents
1. [Introduction](#introduction)
2. [Design Patterns](#design-patterns)
3. [Project Structure](#project-structure)
4. [How to Use](#how-to-use)
5. [How to Run the Code](#how-to-run-the-code)
6. [License](#license)

## Introduction
Design patterns are reusable solutions to common problems that software developers encounter during the design and development of software applications. They provide a structured and proven approach to solving these problems, enhancing the maintainability and readability of your code. See the following for a list of design patterns in this repository.

## Design Patterns
### Creational Patterns
1. **Factory Method**: [Link to Factory Method Examples](./Creational-Patterns/Factory-Method/)

2. **Abstract Factory**: [Link to Abstract Factory Examples](./Creational-Patterns/Abstract-Factory/)

3. **Builder**: [Link to Builder Examples](./Creational-Patterns/Builder/)

4. **Prototype**: [Link to Prototype Examples](./Creational-Patterns/Prototype/)

5. **Singleton**: [Link to Singleton Examples](./Creational-Patterns/Singleton/)

### Structural Patterns
1. **Adapter**: [Link to Adapter Examples](./Structural-Patterns/Adapter/)

2. **Bridge**: [Link to Bridge Examples](./Structural-Patterns/Bridge/)

3. **Composite**: [Link to Composite Examples](./Structural-Patterns/Composite/)

4. **Decorator**: [Link to Decorator Examples](./Structural-Patterns/Decorator/)

5. **Facade**: [Link to Facade Examples](./Structural-Patterns/Facade/)

6. **Flyweight**: [Link to Flyweight Examples](./Structural-Patterns/Flyweight/)

7. **Proxy**: [Link to Proxy Examples](./Structural-Patterns/Proxy/)

### Behavioral Patterns
1. **Chain of Responsibility**: [Link to Chain of Responsibility Examples](./Behavioral-Patterns/Chain-of-Responsibility/)

2. **Command**: [Link to Command Examples](./Behavioral-Patterns/Command/)

3. **Iterator**: [Link to Iterator Examples](./Behavioral-Patterns/Iterator/)

4. **Mediator**: [Link to Mediator Examples](./Behavioral-Patterns/Mediator/)

5. **Memento**: [Link to Memento Examples](./Behavioral-Patterns/Memento/)

6. **Observer**: [Link to Observer Examples](./Behavioral-Patterns/Observer/)

7. **State**: [Link to State Examples](./Behavioral-Patterns/State/)

8. **Strategy**: [Link to Strategy Examples](./Behavioral-Patterns/Strategy/)

9. **Template Method**: [Link to Template Method Examples](./Behavioral-Patterns/Template-Method/)

10. **Visitor**: [Link to Visitor Examples](./Behavioral-Patterns/Visitor/)

## Project Structure
The repository is organized into subdirectories, each corresponding to a type of design pattern. In each of those there is a directory for all the specific design pattern. Inside each design pattern directory, you will find TypeScript source code along with compiled JavaScript files. You will find a conceptual example of the design pattern named `conceptual.ts` along with one or more real-world examples named after the real-world problem they represent. Additionally, there will be a `README.md` file that explains the design pattern and provided examples.


## How to Use
To explore and learn from the design patterns implemented in this repository, you can follow these steps:

1. Navigate to the specific design pattern directory you are interested in (e.g., `Creational-Patterns/Factory-Method/`).
2. Inside each design pattern directory, you'll find TypeScript and JavaScript files. The `conceptual.ts` file provide a basic understanding of the design pattern, while the other examples demonstrate how the pattern is used in a practical scenario. On top of the TypeScript files there also is the compiled JavaScript file that can be ran using node to examine how the design pattern function and the output.
3. Read the `README.md` file in each directory to get an overview of the design pattern and learn how to use it.
4. Examine the TypeScript source code and compiled JavaScript files to see the pattern in action.
5. Experiment with the code, modify it, and use it as a reference for your projects.

## How to Run the Code
These steps should help you clone the repository, navigate to specific design pattern directories, run JavaScript code, and recompile and run updated TypeScript code as needed. Ensure that you have Node.js and tsc installed as they are both needed.

### Cloning the Repository

1. **Clone the Repository:** To get started, open your terminal or command prompt and use the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/paytonshafer/Design-Patterns.git
   ```

2. **Change Directory:** Navigate to the cloned repository's root directory using the `cd` command:

   ```bash
   cd Design-Patterns
   ```

### Running JavaScript Code

3. **Navigate to a Design Pattern Directory:** Choose a specific design pattern directory you want to explore (e.g., `cd Creational-Patterns/Factory-Method`):

   ```bash
   cd <Type-of-Pattern>/<Pattern-Name>
   ```

4. **Run JavaScript Code:** Inside the chosen design pattern directory, locate the JavaScript files (`.js`) and use Node.js to run them (e.g., `node conceptual.js`):

   ```bash
   node <file-name>.js
   ```

   This will execute the JavaScript file named `<file-name>`.

### Recompiling and Running TypeScript Code

5. **Edit TypeScript Code:** If you want to make changes to the TypeScript code, navigate to the TypeScript source code files (`.ts`) in the design pattern directory and edit them using your preferred code editor.

6. **Recompile TypeScript Code:** After making changes to the TypeScript code, you need to recompile it into JavaScript. Use the TypeScript compiler (tsc) to do this:

   ```bash
   tsc
   ```

   This command will compile all TypeScript files in the current directory.

7. **Run the Recompiled JavaScript Code:** Once the TypeScript code is successfully recompiled, you can run the updated JavaScript code using Node.js, as described in step 4.

8. **View Changes:** Observe the effects of your changes by running the recompiled JavaScript code.


## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
