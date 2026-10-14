# Circus of DOM (Cirque du DOM)

This is the Circus adapter for unit testing web components and DOM-based UIs. It
provides setup and driver implementations backed by `HTMLElement`,
`@testing-library/dom`, and `@testing-library/user-event`.

## Installation

For unit testing, install the adapter as a development dependency:

```sh
# npm
npm install --save-dev @zthun/cirque @zthun/cirque-du-dom
# Yarn
yarn add --dev @zthun/cirque @zthun/cirque-du-dom
```

If your library exports component models, include `@zthun/cirque` as a
dependency or peer dependency instead.

## Setup

This package provides two setup classes:
[**ZCircusSetupHtml**](./src/setup/circus-setup-html.mts) and
[**ZCircusSetupHtmlElement**](./src/setup/circus-setup-html-element.mts).

Use `ZCircusSetupHtml` to render an HTML string inside a `div` container. Use
`ZCircusSetupHtmlElement` to provide your own container template. The latter
clones the template and appends the clone to `document.body`; it does not attach
the original element. Both setups return a driver for the container and remove
that container when you call `destroy()`.

Run DOM tests in an environment that provides `document`, such as happy-dom or
jsdom. Register any custom elements before calling `setup()`.

## Example

This example assumes that `my-component` is registered and
`MyComponentComponentModel` is defined with a matching selector.

```ts
import type { IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupHtml } from "@zthun/cirque-du-dom";
import { afterEach, describe, expect, it } from "vitest";

// Import MyComponentComponentModel from your application.

describe("MyComponent", () => {
  let renderer: IZCircusSetup | undefined;

  afterEach(async () => {
    await renderer?.destroy?.();
  });

  const createTestTarget = async () => {
    renderer = new ZCircusSetupHtml("<my-component></my-component>");
    const driver = await renderer.setup();
    return ZCircusBy.first(driver, MyComponentComponentModel);
  };

  it("should render the component", async () => {
    const target = await createTestTarget();
    expect(target).toBeDefined();
  });
});
```
