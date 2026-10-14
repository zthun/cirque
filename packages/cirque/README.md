# Circus

The main Zthunworks Circus package, `@zthun/cirque`, contains the abstractions
and interfaces for creating component models. It is intended for use in
production packages, rather than only as a development dependency. If your
library exports component models, include `@zthun/cirque` as a dependency or
peer dependency.

The `@zthun/cirque-du-*` adapters are typically development dependencies when
used for testing. Code that uses an adapter at runtime, such as a workflow bot,
needs it as a runtime dependency.

The package also provides keyboard identifiers and an action builder. You can
use the keyboard utilities without using Circus for testing.

## Installation

```sh
# npm
npm install @zthun/cirque
# Yarn
yarn add @zthun/cirque
```

## Usage

There are several classes, helpers, and interfaces that can help you implement
tests and component models.

### Driver

At the heart of the Circus framework is the
[**IZCircusDriver**](./src/driver/circus-driver.mts) interface. A driver wraps a
DOM context and the interactions available within it. If you have used Selenium,
this interface should feel familiar. Two common methods are `query` and
`select`: `query` returns all elements that match a CSS selector, or an empty
array if none match; `select` returns the first matching element and rejects if
none match.

```ts
function findElementsByName(
  driver: IZCircusDriver,
  name: string,
): Promise<IZCircusDriver[]> {
  // Returns all elements with the given name, or an empty array if none match.
  return driver.query(`[name="${name}"],[data-name="${name}"]`);
}

function findElementByName(
  driver: IZCircusDriver,
  name: string,
): Promise<IZCircusDriver> {
  // Returns the first matching element and rejects if none match.
  return driver.select(`[name="${name}"],[data-name="${name}"]`);
}
```

To obtain a driver, use an
[**IZCircusSetup**](./src/performance/circus-setup.mts) implementation. The
setup and driver implementations depend on the framework; component models
consume their shared interfaces. For React unit tests, use
[ZCircusSetupRenderer](../cirque-du-react/src/setup/circus-setup-renderer.mts).

```tsx
const element = <MyComponentUnderTest />;
const renderer = new ZCircusSetupRenderer(element);
const driver = await renderer.setup();
// The driver points to the rendered container.
try {
  await driver.query(MyComponentUnderTestComponentModel.Selector);
} finally {
  await ZCircusDestroy.sequential(driver, renderer);
}
```

The `wait` method pauses until a condition is met. UI interactions often trigger
asynchronous changes, such as animations or elements appearing after an action.

Pass a callback that returns a boolean or a promise of a boolean. The driver
checks the condition until it returns `true` or the timeout expires. If the
condition is never met, the promise rejects. You can customize the timeout and
initial delay with `ZCircusWaitOptionsBuilder`; the defaults are a 10-second
timeout and no initial delay.

```ts
export class MyModalComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".MyModal-root";

  public async close(): Promise<void> {
    const body = await this.driver.body();
    const closeButton = await this.driver.select(".MyModal-close");
    const act = new ZCircusActBuilder().click().build();
    await closeButton.perform(act);
    // Wait until the modal is no longer present in the document body.
    await body.wait(() =>
      body.peek(MyModalComponentModel.Selector).then((m) => !m),
    );
  }
}
```

Use `ZCircusDestroy.sequential(driver, renderer)` to clean up both the driver
and its setup, in that order. The helper skips missing objects and optional
`destroy` methods.

### Component Models

Component models can extend
[**ZCircusComponentModel**](./src/component/circus-component-model.mts), which
stores the driver passed to the constructor. Extending this class is optional: a
compatible model needs a constructor that accepts a driver, a public `driver`
property, and a static `Selector`.

[**ZCircusBy**](./src/component/circus-by.mts) provides helpers for constructing
models. `all` returns every matching model, and `optional` returns the first
match or `null`. `first` and `css` wait for a matching element before
constructing a model and reject if the wait times out. `first` and `optional`
can also filter by a `name` or `data-name` attribute.

```tsx
import type { IZCircusDriver } from "@zthun/cirque";
import {
  ZCircusBy,
  ZCircusComponentModel,
  ZCircusDestroy,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";

interface IMyCard {
  title: string;
  children?: ReactNode;
}

// This example uses React. Component models can support any framework
// with compatible IZCircusSetup and IZCircusDriver implementations.
export function MyCard(props: IMyCard) {
  const { title, children } = props;

  return (
    <div className="MyCard-root">
      <div className="MyCard-header">{title}</div>
      <div className="MyCard-body">{children}</div>
    </div>
  );
}

export class MyCardComponentModel extends ZCircusComponentModel {
  // Keep selectors in the model so tests do not depend on the DOM structure.
  public static readonly Selector = ".MyCard-root";

  public header(): Promise<IZCircusDriver> {
    return this.driver.select(".MyCard-header");
  }

  public body(): Promise<IZCircusDriver> {
    return this.driver.select(".MyCard-body");
  }
}

describe("MyCard", () => {
  const title = "Hello Circus";
  let driver: IZCircusDriver | undefined;
  let renderer: ZCircusSetupRenderer | undefined;

  afterEach(async () => {
    await ZCircusDestroy.sequential(driver, renderer);
  });

  const createTestTarget = async () => {
    const element = (
      <MyCard title={title}>
        <div className="card-content">
          I do not have to worry about the underlying structure of the component
          in order to test it. Instead, I interact with the component model,
          which tells me how interaction with the component is supposed to work.
        </div>
      </MyCard>
    );

    renderer = new ZCircusSetupRenderer(element);
    driver = await renderer.setup();
    return ZCircusBy.first(driver, MyCardComponentModel);
  };

  it("should render the content under the card body.", async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const body = await target.body();
    const [actual] = await body.query(".card-content");
    // Assert
    expect(actual).toBeDefined();
  });

  it("should render the title in the header.", async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const header = await target.header();
    const actual = await header.text();
    // Assert
    expect(actual).toEqual(title);
  });
});
```

### Performances

What would a circus be without a performance? The **ZCircusActBuilder** builds
an ordered sequence of actions, usually keyboard and mouse interactions.

Pressing a key produces a `KeyDown` action, and releasing it produces a `KeyUp`
action. Mouse buttons similarly produce `MouseDown` and `MouseUp` actions. The
builder combines these into operations such as `press`, `type`, and `click`.

Each driver has a `perform` method that runs the act against its DOM context.
You are the ringmaster: provide the script, and the driver performs it.

The following example types into a form and clicks the submit button. It assumes
that `MyForm`, `MyService`, and `mockService` are defined in your application.

```tsx
import type { IZCircusDriver } from "@zthun/cirque";
import {
  ZCircusActBuilder,
  ZCircusBy,
  ZCircusComponentModel,
  ZCircusDestroy,
  ZCircusKeyboardQwerty,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";

// Import MyForm, MyService, and mockService from your application and test helpers.

export class MyFormComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".MyForm-root";

  public firstName(): Promise<IZCircusDriver> {
    return this.driver.select('input[name="first-name"]');
  }

  public lastName(): Promise<IZCircusDriver> {
    return this.driver.select('input[name="last-name"]');
  }

  public submit(): Promise<IZCircusDriver> {
    return this.driver.select('button[type="submit"]');
  }
}

describe("MyForm", () => {
  let driver: IZCircusDriver | undefined;
  let renderer: ZCircusSetupRenderer | undefined;

  afterEach(async () => {
    await ZCircusDestroy.sequential(driver, renderer);
  });

  const createTestTarget = async () => {
    const element = (
      <MyService.Provider value={mockService}>
        <MyForm />
      </MyService.Provider>
    );
    renderer = new ZCircusSetupRenderer(element);
    driver = await renderer.setup();
    return ZCircusBy.first(driver, MyFormComponentModel);
  };

  it("should submit the form.", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const firstName = await target.firstName();
    // type adds key presses for characters supported by the QWERTY translator.
    // press combines keyDown and keyUp and can repeat a key press.
    // ZCircusKeyboardQwerty provides identifiers for standard QWERTY keys.
    const enterFirstName = new ZCircusActBuilder()
      // cspell:disable next-line
      .type("Bruceee")
      .press(ZCircusKeyboardQwerty.backspace, 2)
      .build();
    await firstName.perform(enterFirstName);
    const lastName = await target.lastName();
    const enterLastName = new ZCircusActBuilder().type("Wayne").build();
    await lastName.perform(enterLastName);
    const submit = await target.submit();
    // click combines leftMouseDown and leftMouseUp.
    const clickSubmit = new ZCircusActBuilder().click().build();
    await submit.perform(clickSubmit);
    // Assert.
    expect(mockService.updateUser).toHaveBeenCalledWith({
      firstName: "Bruce",
      lastName: "Wayne",
    });
  });
});
```

## Conclusion

The driver abstracts DOM interactions, performances describe user actions, and
component models make those interactions reusable across unit and end-to-end
tests. Choose the adapter that matches your test environment.

| Framework | Package                                                      |
| --------- | ------------------------------------------------------------ |
| DOM       | [@zthun/cirque-du-dom](../cirque-du-dom/README.md)           |
| React     | [@zthun/cirque-du-react](../cirque-du-react/README.md)       |
| Selenium  | [@zthun/cirque-du-selenium](../cirque-du-selenium/README.md) |
