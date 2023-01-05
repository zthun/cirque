import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZChecklist } from './checklist';
import { ZChecklistComponentModel } from './checklist.cm';

describe('ZChecklist', () => {
  const createTestTarget = async () => {
    const element = <ZChecklist />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZChecklistComponentModel);
  };

  describe('Adding items', () => {
    it('should add a new item to the end of the list', async () => {
      // Arrange.
      const target = await createTestTarget();
      const batman = 'Batman';
      const superman = 'Superman';
      const flash = 'Flash';
      const expected = 'Batman;Superman;Flash';
      // Act.
      let item = await target.add();
      await item.value(batman);
      item = await target.add();
      await item.value(superman);
      item = await target.add();
      await item.value(flash);
      const items = await target.items();
      const actual = await Promise.all(items.map((item) => item.value()));
      // Assert.
      expect(actual.join(';')).toEqual(expected);
    });
  });
});
