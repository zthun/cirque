# Circus of Selenium

This is the framework specific circus package for using Selenium's web driver for end to end testing.

## Installation

```sh
# NPM
npm install @zthun/cirque @zthun/cirque-du-selenium
# Yarn
yarn add @zthun/cirque @zthun/cirque-du-selenium
```

## Browsers

The setup implementations for selenium is the basic choice of what browser you want to support. You have a couple of
options. Currently, only Firefox, Chrome, and Edge are supported.

> Safari can work, but there have been some bugs discovered which render it currently incompatible for the time being.
> We will NEVER support Internet Explorer as that browser needs to just fade away for good.

```ts
import { Given, After } from '@cucumber/cucumber';

const URL = 'http://localhost:8459';

Given('I open chrome', async function (this: World<any>) {
  this.parameters.driver = await new ZCircusSetupChrome(URL).setup();
});

Given('I open firefox', async function (this: World<any>) {
  this.parameters.driver = await new ZCircusSetupFirefox(URL).setup();
});

Given('I open edge', async function (this: World<any>) {
  this.parameters.driver = await new ZCircusSetupEdge(URL).setup();
});

Given('My page loads', async function (this: World<any>) {
  const { driver } = this.parameters;
  this.parameters.page = ZCircusBy.first(driver, MyPageComponentModel);
});

After(async function (this: World<any>) {
  const { driver } = this.parameters;
  await driver?.destroy();
});
```
