# Circus Of React (Cirque Du React)

This is the framework specific circus package for React based unit testing. Under the hood, this provides the necessary
setup and driver implementations that contains the anti-corruption patter for @testing-library/react and
@testing-library/react-hooks.

## Installation

```sh
# NPM
npm install @zthun/cirque @zthun/cirque-du-react
# Yarn
yarn add @zthun/cirque @zthun/cirque-du-react
```

## Setup

There are two circus setup classes to this package, [**ZCircusSetupRenderer**](./src/setup/circus-setup-renderer.ts) and
[**ZCircusSetupHook**](./src/setup/circus-setup-hook.ts).

Generally speaking, testing hooks does not really fall under the guise of component models or component testing, but the
setup is here for the sake of completeness and helps you with not having to import anything from @testing-library
directly.

## Driver

You should never need to worry about the driver implementation since your only action with this package should be the
setup implementation. However, it should be stated that one major advantage of using this package is that you no longer
need to wrap actions and updates in an act() block. You can just test and use component models like you would normally.
The act block is taken care of for you behind the scenes so you should no longer receive warnings about doing a rerender
outside of an act block.

The hook driver is not a real implementation of an IZCircusDriver as it's much more compact and does way less. Again,
the hook setup is here for convenience and completion.

```tsx
describe('MyComponent', () => {
  const createTestTarget = () => {
    const element = <MyComponent />;
    // The setup does the rendering behind the scenes and the driver given to you
    // points to the container element under the testing library render result.
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, MyComponent);
  };
});
```
