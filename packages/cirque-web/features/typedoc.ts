import { After, Given, setDefaultTimeout, Then, When, World } from '@cucumber/cucumber';
import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupChrome } from '@zthun/cirque-du-selenium';
import assert from 'assert';
import { ZTypedocPageComponentModel } from '../src/typedoc-page.cm';

setDefaultTimeout(30000);

interface IZWorld {
  browser: IZCircusSetup<IZCircusDriver>;
}

async function page(world: IZWorld) {
  const driver = await world.browser.setup();
  return ZCircusBy.first(driver, ZTypedocPageComponentModel);
}

Given('I navigate to the typedoc application', async function (this: World<IZWorld>) {
  const url = 'http://localhost:5173';
  this.parameters.browser = new ZCircusSetupChrome(url).acceptInsecureCerts();
});

When('I search for {string} on the typedoc page', async function (this: World<IZWorld>, phrase: string) {
  const app = await page(this.parameters);
  const toolbar = await app.toolbar();
  await toolbar.search(phrase);
});

When('I click the home button', async function (this: World<IZWorld>) {
  const app = await page(this.parameters);
  const toolbar = await app.toolbar();
  await toolbar.home();
});

Then(
  'I should be taken to a page with the title containing {string}',
  async function (this: World<IZWorld>, title: string) {
    const app = await page(this.parameters);
    const content = await app.content();
    const actual = await content.title();
    assert(actual.indexOf(title) >= 0);
  }
);

After(async function (this: World<IZWorld>) {
  const { browser } = this.parameters;
  await browser.destroy?.call(browser);
});
