# Circus of Selenium

This is the Circus adapter for end-to-end testing with `selenium-webdriver`. It
provides browser setup classes and a driver that implements the shared
`IZCircusDriver` interface.

## Installation

For end-to-end testing, install the adapter as a development dependency:

```sh
# npm
npm install --save-dev @zthun/cirque @zthun/cirque-du-selenium
# Yarn
yarn add --dev @zthun/cirque @zthun/cirque-du-selenium
```

If your library exports component models, include `@zthun/cirque` as a
dependency or peer dependency instead. Code that uses Selenium at runtime, such
as a workflow bot, also needs the adapter as a runtime dependency.

## Browsers

The package provides setup classes for Chrome, Firefox, and Edge:
`ZCircusSetupChrome`, `ZCircusSetupFirefox`, and `ZCircusSetupEdge`. It does not
provide setup classes for Safari or Internet Explorer.

Each setup accepts the URL to open and returns a driver rooted at the page's
`html` element. Chrome also supports `.headless()`. All browser setups support
`.acceptInsecureCerts()` for test environments with untrusted certificates. Call
`ZCircusDestroy.sequential(driver, renderer)` to clean up the driver and close
the browser session through its setup.

## Example

This Cucumber example assumes that `MyPageComponentModel` is defined in your
application. Both the driver and browser setup are retained so the `After` hook
can destroy them in order.

```ts
import { After, Given } from "@cucumber/cucumber";
import type { World } from "@cucumber/cucumber";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import {
  ZCircusSetupChrome,
  ZCircusSetupEdge,
  ZCircusSetupFirefox,
} from "@zthun/cirque-du-selenium";

// Import MyPageComponentModel from your application.

const URL = "http://localhost:8459";

Given("I open chrome", async function (this: World<any>) {
  this.parameters.browser = new ZCircusSetupChrome(URL);
  this.parameters.driver = await this.parameters.browser.setup();
});

Given("I open firefox", async function (this: World<any>) {
  this.parameters.browser = new ZCircusSetupFirefox(URL);
  this.parameters.driver = await this.parameters.browser.setup();
});

Given("I open edge", async function (this: World<any>) {
  this.parameters.browser = new ZCircusSetupEdge(URL);
  this.parameters.driver = await this.parameters.browser.setup();
});

Given("My page loads", async function (this: World<any>) {
  const { driver } = this.parameters;
  this.parameters.page = await ZCircusBy.first(driver, MyPageComponentModel);
});

After(async function (this: World<any>) {
  const { driver, browser: renderer } = this.parameters;
  await ZCircusDestroy.sequential(driver, renderer);
});
```
