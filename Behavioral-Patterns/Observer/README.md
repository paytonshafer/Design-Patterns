# Observer Pattern
This directory contains examples of the Observer design pattern implemented in TypeScript. Observer is a behavioral design pattern that facilitates a subscription mechanism, enabling an object (the subject) to notify multiple observers about changes or events in its state. This pattern establishes a one-to-many relationship between the subject and its observers, allowing for efficient and loosely coupled communication. The subject object can be seen as the publisher while the observers are like the subscriber that react to the content the publisher notifies them of. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

<strong>NOTE</strong> that when compiling the file `conceptual.ts` you must use the library tag to denote the specific libraries we want to use which are the dom and es2016 libraries. We need them both since this example uses a list of objects which is available in es2016 and we need dom so that we can log to the console. To compile the file simply run the following command.

```bash
tsc -lib es2016,dom conceptual.ts
```

## Real-World Example
The real worl example is a email notifer for a personal email account where you have the email application on multiple devices. The subject is `EmailNotifer` and the concrete subject is `PaytonEmailNotifer`. The notifer is responsible for adding new applicaiotns, receiving new emails and notifying about them, and marking read emails. The observer interface is called `LocalEmailApp` and the two implementations are `PhoneEmailApp` and `ComputerEmailApp`. These methods are responsible for determining what to do once they are notified. I decided for them to notify their client and if you are on the phone and have more than 20 emails you read 10 of them.

<strong>NOTE</strong> that when compiling the file `email-alerts.ts` you must use the library tag to denote the specific libraries we want to use which are the dom and es2016 libraries. We need them both since this example uses a list of objects which is available in es2016 and we need dom so that we can log to the console. To compile the file simply run the following command.

```bash
tsc -lib es2016,dom email-alerts.ts
```