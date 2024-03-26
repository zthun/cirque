import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZChecklistComponentModel } from './checklist/checklist.cm';
import { ZTodoApp } from './todo-app';
import { ZTodoAppComponentModel } from './todo-app.cm';

describe('ZTodoApp', () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = <ZTodoApp />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZTodoAppComponentModel);
  };

  afterEach(() => {
    _renderer?.destroy?.call(_renderer);
    _driver?.destroy?.call(_driver);
  });

  type ChecklistFactory = (t: ZTodoAppComponentModel) => Promise<ZChecklistComponentModel>;

  const shouldAddItemsToTheCorrectList = async (factory: ChecklistFactory) => {
    // Arrange.
    const target = await createTestTarget();
    const milk = 'Milk';
    const butter = 'Butter';
    const eggs = 'Eggs';
    const bacon = 'Bacon';
    const expected = [milk, butter, eggs, bacon].join(';');
    const list = await factory(target);
    // Act.
    await list.add(milk);
    await list.add(butter);
    await list.add(eggs);
    await list.add(bacon);
    const items = await (await factory(target)).items();
    const actual = await Promise.all(items.map((item) => item.value()));
    // Assert.
    expect(actual.join(';')).toEqual(expected);
  };

  describe('Today Checklist', () => {
    const factory: ChecklistFactory = (t) => t.today();

    it('should add items to the list', async () => {
      await shouldAddItemsToTheCorrectList(factory);
    });
  });

  describe('Tomorrow Checklist', () => {
    const factory: ChecklistFactory = (t) => t.tomorrow();

    it('should add items to the list', async () => {
      await shouldAddItemsToTheCorrectList(factory);
    });
  });

  describe('Future Checklist', () => {
    it('should not be available', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.future();
      // Assert.
      expect(actual).toBeNull();
    });
  });
});
