# Zthunworks Circus

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

## Component Model

You might have heard of something called the Page Object Model, or POM, in the QA world. This is basically the concept
of the model of a single web page and the interactions that make up said page.

Circus introduces the concept of a Component model; this is where you implement a single component, whether that be a
component in react, a native web component, angular component, or a common pattern of code that makes up a part of a web
page, and alongside that component is the component model for tests and bots to consume. By doing this, you essentially
implement the strategy of how to actually interact with your component.

For example, let's say I have a list component that displays a checklist of items. In this case, the component model may
look something like this:

```ts
// checklist.cm.ts
import { ZCircusActBuilder, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { last } from 'lodash-es';
import { ZChecklistItemComponentModel } from './checklist-item.cm';

export class ZChecklistComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZChecklist-root';

  public items(): Promise<ZChecklistItemComponentModel[]> {
    return ZCircusBy.all(this.driver, ZChecklistItemComponentModel);
  }

  public async add(value?: string): Promise<ZChecklistItemComponentModel> {
    const addButton = await this.driver.select('.ZChecklist-footer-add-button');
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

The Selector acts a css selector that would return all DOM elements that represent candidates for a checklist component.
The remainder of the component model has asynchronous functions that will run performances or acts to dazzle your test
framework and validate behaviors. Notice that there is no reference to the test framework or underlying ui framework.
The component model is **framework agnostic**. This is an important feature of a component model. Regardless of what
framework the component is written in, the way of interacting with that component on a user level remains the same. You
just need to make sure that the output DOM elements have the necessary classes to target the specific pieces.
