# Zthunworks Circus

Writing tests for UIs can be a pain. There are several frameworks, and they all
handle tests differently. React unit tests, for example, often use
`@testing-library/react`, while end-to-end tests use tools such as
`selenium-webdriver`. A bot that automates workflows may use yet another
approach. These differences can bloat the codebase by solving the same
interaction problems in multiple ways. The user's interaction with a component
stays the same, so why should each framework require a different API?

Zthunworks Circus addresses this problem with a design pattern and libraries
that provide consistent APIs across frameworks. Circus gives you and your team
the tools to keep your tests consistent and simple to write.

Welcome to the show. We hope you enjoy your stay!

## Component Model

You might have heard of the Page Object Model (POM) in the QA world. A page
object models a single web page and the interactions that make up that page.

Circus applies this idea to individual components. A component model describes
how to interact with a React component, a native web component, an Angular
component, or another reusable part of a page. You implement the model alongside
the component so tests and bots can share the same interaction logic.

For example, let's say I have a list component that displays a checklist of
items. In this case, the component model may look something like this:

```ts
// checklist.cm.mts
import {
  ZCircusActBuilder,
  ZCircusBy,
  ZCircusComponentModel,
} from "@zthun/cirque";
import { last } from "lodash-es";
import { ZChecklistItemComponentModel } from "./checklist-item.cm.mjs";

export class ZChecklistComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZChecklist-root";

  public items(): Promise<ZChecklistItemComponentModel[]> {
    return ZCircusBy.all(this.driver, ZChecklistItemComponentModel);
  }

  public async add(value?: string): Promise<ZChecklistItemComponentModel> {
    const addButton = await this.driver.select(".ZChecklist-footer-add-button");
    const action = new ZCircusActBuilder().click().build();
    await addButton.perform(action);
    const items = await this.items();
    const newest = last(items)!;

    if (value == null) {
      return newest;
    }

    await newest.value(value);
    return newest;
  }
}
```

The static `Selector` is a CSS selector that identifies the DOM elements
representing a checklist component. The remaining methods run asynchronous
queries and actions to interact with that component. The model has no references
to the test framework or the underlying UI framework: it is **framework
agnostic**. Regardless of which framework renders the component, its user
interactions stay the same. The rendered DOM only needs the classes or
attributes that the model uses to locate each part.

## Packages

| Name                                                                 | For                                                                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [@zthun/cirque](./packages/cirque/README.md)                         | Shared drivers, component models, actions, and keyboard utilities. |
| [@zthun/cirque-du-dom](./packages/cirque-du-dom/README.md)           | A package for manipulating a browser DOM structure.                |
| [@zthun/cirque-du-react](./packages/cirque-du-react/README.md)       | A testing package for unit testing in React.                       |
| [@zthun/cirque-du-selenium](./packages/cirque-du-selenium/README.md) | A testing package for end-to-end testing using Selenium.           |
