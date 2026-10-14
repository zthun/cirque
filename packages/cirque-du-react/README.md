# Circus of React (Cirque du React)

This is the Circus adapter for React unit tests. It wraps the `render` and
`renderHook` APIs from `@testing-library/react` and uses the DOM driver from
`@zthun/cirque-du-dom` for component interactions.

## Installation

For unit testing, install the adapter as a development dependency:

```sh
# npm
npm install --save-dev @zthun/cirque @zthun/cirque-du-react
# Yarn
yarn add --dev @zthun/cirque @zthun/cirque-du-react
```

The package expects compatible `react` and `react-dom` peer dependencies
(currently React 18.2 or later, up to but excluding React 20). Run tests in an
environment that provides a DOM, such as happy-dom or jsdom.

If your library exports component models, include `@zthun/cirque` as a
dependency or peer dependency instead.

## Setup

This package provides two setup classes:
[**ZCircusSetupRenderer**](./src/setup/circus-setup-renderer.mts) for components
and [**ZCircusSetupHook**](./src/setup/circus-setup-hook.mts) for hooks.

`ZCircusSetupRenderer` accepts a React element and optional render options. Its
`setup()` method returns a DOM driver for the rendered container. Call
`ZCircusDestroy.sequential(driver, renderer)` to clean up the driver and unmount
the component through its renderer.

Hook testing does not use component models, but `ZCircusSetupHook` provides a
convenient wrapper around `renderHook`. It accepts a hook callback and optional
render-hook options. The returned `IZCircusReactHook` provides `current()`,
`rerender(props?)`, and `destroy()` methods; it does not implement
`IZCircusDriver`. Call `destroy()` on the hook driver to unmount the hook.

## Driver

Component models use the shared `IZCircusDriver` interface, so they do not need
to depend on a React-specific driver.

The setup classes disable `IS_REACT_ACT_ENVIRONMENT` and allow the event loop to
flush after rendering. Component actions use the DOM driver's event handling and
flushing. This implementation does not wrap every update in React's `act()`; use
`driver.wait()` when an assertion depends on an asynchronous change.

## Example

This example assumes that `MyComponent` and `MyComponentComponentModel` are
defined in your application.

```tsx
import type { IZCircusDriver } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";
import { MyComponent } from "./my-component.ts";
import { MyComponentModel } from "./my-component.cm.mjs";

describe("MyComponent", () => {
  let driver: IZCircusDriver | undefined;
  let renderer: ZCircusSetupRenderer | undefined;

  afterEach(async () => {
    await ZCircusDestroy.sequential(driver, renderer);
  });

  const createTestTarget = async () => {
    const element = <MyComponent />;
    renderer = new ZCircusSetupRenderer(element);
    // The driver points to the rendered container.
    driver = await renderer.setup();
    return ZCircusBy.first(driver, MyComponentComponentModel);
  };

  it("should render the component", async () => {
    const target = await createTestTarget();
    expect(target).toBeDefined();
  });
});
```
