# State Pattern
This directory contains examples of the State design pattern implemented in TypeScript. State is a behavioral design pattern that enables an object to change its behavior dynamically when its internal state undergoes a transition. This pattern allows the object to appear as if it has changed its class, adapting its actions based on different states. By putting state-specific logic into separate classes and delegating the responsibility of handling state transitions, the State pattern promotes flexibility and extensibility for managing the objects behaivor.If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example here is a media player with three states: locked, ready and playing. The base state is called `State` which defines default funciton implemented by the concrete states. The three concrete states are `LockedState`, `ReadyToPlayState` and `PlayingState` which each implement the functionality based on the base state. The `Player` class holds the state and acts differently based on what state it is currenly in.