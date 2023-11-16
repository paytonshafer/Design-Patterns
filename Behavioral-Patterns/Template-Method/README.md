# Template Method Pattern
This directory contains examples of the Template Method design pattern implemented in TypeScript. The Template Method is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure. The template method is defined in the base class where work is either done by that class or is done by an abstract method that will be implemented in the subclass. If at any point you would like to obtain and run these files refer to the root `README.md` found [here](../../).

## Conceptual Example
The conceptual example can be found in `conceptual.ts` and ran from `conceptual.js`. The TypeScript files contains the code and explanations of what each element does in the design pattern.

## Real-World Example
The real world example is a simple network that posts to social media platforms. The absract class `Network` defines the template method `post` that will post to a social network. We then have two concrete classes called `Twitter` and `Facebook` these classes post to their respective networks. The client is able to post a message to facebook or twitter usuing the post method defined in the absract class `Network`.

<strong>NOTE</strong> that when compiling the file `payment-method.ts` you must use the library tag to denote the specific libraries we want to use which are the dom and es2015 ones. We need them both since this example uses the type Promise<string> which is available in es2015 and we need dom so that we can log to the console. To compile the file simply run the following command.

```bash
tsc --lib dom,es2015 payment-method.ts
```

<strong>NOTE</strong> that when compiling the TypeScript there are 2 types of errors you can safely ignore that are listed below.
1. 'error TS2307: Cannot find module 'readline' or its corresponding type declarations.'
2. 'error TS2580: Cannot find name 'process'.'