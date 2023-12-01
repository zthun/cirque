# Circus

Zthunworks Circus' main package is @zthun/cirque. Cirque contains all of the abstractions and interfaces that your
application will need in order to begin creating component models. The @zthun/cirque package _is meant to be used in a
production package_. It is not a test only, dev dependency. If you are creating a library that exports out component
models, you will want to make sure that cirque is some kind of dependency of your library.

The actual @zthun/cirque-du-_framework_ packages **are** dev dependencies and those are not meant to be exported in a
production environment.

This package also has some useful functionality around keyboard input that is not found from within a JavaScript engine,
so even if you are not using this package for testing, you can still use it for the keyboard identifiers.

## Installation

```sh
# NPM
npm install @zthun/cirque
# Yarn
yarn add @zthun/cirque
```

## Usage

There are several classes, helpers, and interfaces that can help you implement tests and component models.

### Driver

At the heart of the circus framework is the [**IZCircusDriver**](./src/driver/circus-driver.ts) interface. This
interface is a wrapper around the DOM and the interactions around it. If you have ever used selenium, then this will
feel very familiar to you. The driver itself has several methods for interacting with the DOM, but the main ones you
will use the most often are query and select. Query will find all elements that match a css selector, and select will
match the first element that matches a css selector. The main difference here is that query is optional and can return
no elements, or an empty array, whereas select will return a rejected promise if no element matches the query.

```ts
function findElementsByName(driver: IZCircusDriver, name: string): Promise<IZCircusDriver[]> {
  // Returns all elements with the given name.  Will return an empty array if no such elements
  // match the query.
  return driver.query(`[name="${name}"],[data-name="${name}"]`);
}

function findElementByName(driver: IZCircusDriver, name: string): Promise<IZCircusDriver> {
  // Returns the first element that matches the given name.  Will return a rejected
  // promise if it cannot find anything.
  return driver.select(`[name="${name}"],[data-name="${name}"]`);
}
```

To actually retrieve a driver object, you will need to consume a [**setup**](./src/performance/circus-setup.ts)
implementation. _A circus setup is the only thing that is NOT framework agnostic_. The implementation for the setup will
depend on the outer framework you are using. For example, if you are writing react unit tests, you would consume a
[ZCircusSetupRenderer](../cirque-du-react/src/setup/circus-setup-renderer.ts) object to obtain a driver.

```ts
const element = <MyComponentUnderTest />;
const driver = await new ZCircusSetupRenderer(element).setup();
// The driver now points to the root container and you can now use it
// without worrying about your framework.
driver.query(MyComponentUnderTestComponentModel.Selector);
```

The other method here is a way to halt the execution of things and allow things to happen asynchronously. This is where
the **wait** method comes into play. User interaction with a UI application is asynchronous. The user does an action and
then waits for the appropriate reaction. Waiting is necessary for things like animations to finish or elements to become
visible after some act is performed.

The wait method takes a function callback that returns a boolean or a boolean promise. I will wait a specific amount of
time for that method to return true, and when it does it immediately exits. If the callback does not ever return a true
value, then the wait call returns a rejected promise and any test waiting on something to happen will properly fail.

```ts
export class MyModalComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.MyModal-root';

  public close() {
    const body = this.driver.body();
    const closeButton = await this.driver.select('.MyModal-close');
    const act = new ZCircusActBuilder().click().build();
    await closeButton.perform(act);
    // This waits for the modal to no longer exist under the body DOM element.
    // The peek method will return true if it finds something under driver context,
    // and false if there is no such element.  The then block reverses the boolean since
    // we want to wait until the modal no longer exists so we want body.peek to return
    // false.
    await body.wait(() => body.peek(MyModalComponentModel.Selector).then((m) => !m));
  }
}
```

### Component Models

All component models have the [**ZCircusComponentModel**](./src/component/circus-component-model.ts) abstract class they
can inherit from, but this is not 100% required. It will save you typing in the all component models that are expected
to be constructed will take a driver object. In combination with the ZCircusComponentModel, you also have the
[**ZCircusBy**](./src/component/circus-by.ts) class, which is useful for running queries to construct component models
in common ways.

```tsx
// The following component here is a react component, but you can create a component model for any framework
// as long as an IZCircusSetup implementation is provided and the equivalent IZCircusDriver implementation
// to run queries in that framework.
export function MyCard(props: IMyCard) {
  const { title, children } = props;

  return (
    <div className='MyCard-root'>
      <div className='MyCard-header'>{title}</div>
      <div className='MyCard-body'>{children}</div>
    </div>
  );
}

export class MyCardComponentModel extends ZCircusComponentModel {
  // The names of these classes are encapsulated in this component
  // model so you can just use this model directly and not have to
  // worry in the case that the structure of the underlying component
  // changes or the class names change.
  public static readonly Selector = '.MyCard-root';

  public header(): Promise<IZCircusDriver> {
    return this.driver.select('.MyCard-header');
  }

  public body(): Promise<IZCircusDriver> {
    return this.driver.select('.MyCard-body');
  }
}

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';

describe('MyCard', () => {
  const title = 'Hello Circus';

  const createTestTarget = async () => {
    const element = (
      <MyCard title={title}>
        <div className='card-content'>
          I do not have to worry about the underlying structure of the component in order to test it. Instead, I
          interact with the component model, which tells me how interaction with the component is supposed to work.
        </div>
      </MyCard>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, MyCardComponentModel);
  };

  it('should render the content under the card body.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const body = await target.body();
    const [actual] = await body.query('.card-content');
    // Assert
    expect(actual).toBeDefined();
  });

  it('should render the title in the header.', async () => {
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

What would a circus be without a performance. This is where the magic happens and is the most useful feature of the
cirque package. The **ZCircusActBuilder** allows you to build a performance of actions that the user will perform. This
usually boils down to keyboard and mouse actions.

Think of your own usage. When you click a mouse button, or you press a key on your keyboard, what is actually happening.
When you push a key, the KeyDown action happens and when you release the key, the KeyUp action happens. Likewise, when
you push your mouse buttons, a MouseDown action happens, and when you release it, a MouseUp action happens. The circus
action is built around this - actual representations of human interactions with devices.

You'll notice a _perform_ method on every driver. Each driver element context has the ability to perform an action. You
can think of all DOM elements as circus employees in this case. You are the ringmaster that is directing the show. You
provide a performance script to the driver and the driver simply performs the entire act in one fell swoop.

Let's take an example of an input where the user needs to type information into a form and press the submit button.

```tsx
export class MyFormComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.MyForm-root';

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

describe('MyForm', () => {
  const createTestTarget = () => {
    const element = (
      <MyService.Provider value={mockService}>
        <MyForm />;
      </MyService.Provider>
    );
    const driver = await new ZCircusSetupReact(element).setup();
    return ZCircusBy.first(driver, MyFormComponentModel);
  };

  it('should submit the form after entering in the information needed.', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const firstName = await target.firstName();
    // Note that type is the same as doing multiple key down and key up strokes all at once.
    // Press is the combination of key down and key up strokes 1 or more times.
    // The ZCircusKeyboardQwerty is a utility class that contains every possible key that you
    // find on a standard qwerty keyboard and includes all of the upper case, lower case
    // and code variants according to the JavaScript key standard.  If you don't want to use
    // cirque for testing, you can actually just use it exclusively for this keyboard utility
    // class.
    // cspell:disable next-line
    const enterFirstName = new ZCircusActBuilder().type('Bruceee').press(ZCircusKeyboardQwerty.backspace, 2).build();
    await firstName.perform(enterFirstName);
    const lastName = await target.lastName();
    const enterLastName = new ZCircusActBuilder().type('Wayne').build();
    await lastName.perform(enterLastName);
    const submit = await target.submit();
    // Click here is a combination of leftMouseDown and leftMouseUp.
    const clickSubmit = new ZCircusActBuilder().click().build();
    await submit.click();
    // Assert.
    expect(mockService.updateUser).toHaveBeenCalledWith({ firstName: 'Bruce', lastName: 'Wayne' });
  });
});
```

## Conclusion

This is the majority of what the basic cirque package offers you. You learned about the driver and how it abstracts away
the interaction between the DOM and the framework. You learned how to enact user performances through said drivers and
how to construct proper component models for reuse across unit and end to end tests. When writing tests, your next step
will be to decide which framework packages you wish to support.

| Framework | Package                                                      |
| --------- | ------------------------------------------------------------ |
| React     | [@zthun/cirque-du-react](../cirque-du-react/README.md)       |
| Selenium  | [@zthun/cirque-du-selenium](../cirque-du-selenium/README.md) |
