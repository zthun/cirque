import { After, Given, setDefaultTimeout, Then, When, World } from '@cucumber/cucumber';
import { IZCircusDriver, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupChrome } from '@zthun/cirque-du-selenium';
import assert from 'assert';
import { ZTodoAppComponentModel } from '../src/todo/todo-app.cm';

setDefaultTimeout(30000);

interface IZWorld {
  driver: IZCircusDriver;
  app: ZTodoAppComponentModel;
}

type ChecklistTarget = 'today' | 'tomorrow';

Given('I navigate to the ToDo application', async function (this: World<IZWorld>) {
  const url = 'http://localhost:5173/';
  this.parameters.driver = await new ZCircusSetupChrome(url).setup();
  this.parameters.app = await ZCircusBy.first(this.parameters.driver, ZTodoAppComponentModel);
});

When(
  'I click the Add button on the {string} list on the todo application',
  async function (this: World<IZWorld>, name: ChecklistTarget) {
    const { app } = this.parameters;
    const list = await app[name]();
    await list.add();
  }
);

When(
  'I add an item named {string} to the {string} list on the todo application',
  async function (this: World<IZWorld>, value: string, name: ChecklistTarget) {
    const { app } = this.parameters;
    const list = await app[name]();
    await list.add(value);
  }
);

Then(
  'I should have {string} items in the {string} list on the todo application',
  async function (this: World<IZWorld>, _count: string, name: ChecklistTarget) {
    const expected = +_count;
    const { app } = this.parameters;
    const list = await app[name]();
    const length = (await list.items()).length;
    assert.equal(length, expected);
  }
);

Then(
  'the value of the items should be {string} in the {string} on the todo application',
  async function (this: World<IZWorld>, values: string, name: ChecklistTarget) {
    const expected = values.split(',');
    const { app } = this.parameters;
    const list = await app[name]();
    const items = await list.items();
    const actual = await Promise.all(items.map((item) => item.value()));
    assert.deepEqual(actual, expected);
  }
);

After(async function (this: World<IZWorld>) {
  const { driver } = this.parameters;
  await driver.destroy();
});
