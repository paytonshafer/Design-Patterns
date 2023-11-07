# Singleton Pattern
This directory contains examples of the Singleton design pattern implemented in TypeScript. The Singleton pattern is a creational design pattern that ensures a class has only one instance and provides a global point of access to that instance. It is commonly used to control access to shared resources such as configuration settings, database connections, or hardware devices. By restricting the instantiation of a class to a single object, it helps manage and centralize the state and behavior of that object throughout the application.If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Thread Safe Example
This example shows how to use the Singleton pattern when dealing with multi-threading. This is done in Python but can be done in any language that supports threads like C++ or Java. We have a metaclass that deals with the threads to ensure only one thread can request the Singleton at a time. Once the first thread gets the lock and initalizes the Singleton all threads that follow will get the instance initalized by the first thread. We can see that this works since we set the `value` argument on construction and when another thread access the Singleton they get the same `value` that was set in the inital creation, proving that we have only ONE Singleton instance. To run this file ensure you have Python installed and run the following command.
```bash
python threads.py
```

## Real-World Example
For the real world example of a singleton I chose to do a database connection. The singleton class is represented by the `Database` class. When connecting to a database we want to make sure that there is only one instance so that when clients connent they connent to the same datbase. The client code shows an example of two clients connecting and both of them adding and getting data from the database. Note that data one client adds is available to the other since the database is an Singleton.