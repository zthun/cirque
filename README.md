# Zthunworks Circus

![Circus](packages/cirque-web/assets/png/cirque-256x256.png)

Writing tests for UIs can be a pain in the ass. There's several frameworks, and they all have different ways of handling
tests. Modern React, for example, uses @testing-library/react for writing unit tests. The api and interactions of
@testing-library is very different than how you would interact with something like selenium-web-driver for writing end
to end tests. If you were writing a bot that simplifies workflows, it would be implemented much differently than how you
would actually write unit or end to end tests. This is a pain. It bloats the code base and solves the same problem
multiple different times, and multiple different ways. So why is it done this way. The users interaction with page
components doesn't change, so why do the frameworks vary so much?

Zthunworks Circus attempts to combat this problem by providing a combination of a design pattern along with libraries
that keep the APIs consistent across frameworks. Circus bridges that gap and gives you and your team the tools needed to
keep your tests consistent and simple to write.

Welcome to the show. We hope you enjoy your stay!

## Getting Started

See the readme for the [@zthun/cirque](./packages/cirque/README.md) project under packages for getting started.

## Component Model

You might have heard of something called the Page Object Model, or POM, in the QA world. This is basically the concept
of the model of a single web page and the interactions that make up said page.

Circus introduces the concept of a Component model; this is where you implement a single component, whether that be a
component in react, a native web component, angular component, or a common pattern of code that makes up a part of a web
page, and alongside that component is the component model for tests and bots to consume. By doing this, you essentially
implement the strategy of how to actually interact with your component. Let's take a challenging concept, a list, for
example. This can be a tough component to interact with, and you may find yourself rewriting patterns of interaction
across testing frameworks. With the circus framework, you can just write the interaction once in a component model and
then reuse those interactions throughout your tests.

```ts

```
