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

  it('should start as empty', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.empty();
    // Assert.
    expect(actual).toBeTruthy();
  });

  describe('Adding items', () => {
    it('should add an item.', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await target.add();
      const actual = await target.empty();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should add new items to the end of the list', async () => {
      // Arrange.
      const target = await createTestTarget();
      const batman = 'Batman';
      const superman = 'Superman';
      const flash = 'Flash';
      const expected = 'Batman;Superman;Flash';
      // Act.
      await target.add(batman);
      await target.add(superman);
      await target.add(flash);
      const items = await target.items();
      const actual = await Promise.all(items.map((item) => item.value()));
      // Assert.
      expect(actual.join(';')).toEqual(expected);
    });
  });
});
