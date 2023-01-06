import { Dispatch, SetStateAction, useState } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZCircusSetupHook } from '../setup/circus-setup-hook';
import { IZCircusReactHook } from './circus-react-hook';

describe('ZCircusReactHook', () => {
  let _target: IZCircusReactHook<[number, Dispatch<SetStateAction<number>>], never>;

  const createTestTarget = async () => {
    _target = await new ZCircusSetupHook(() => useState(0)).setup();
    return _target;
  };

  afterEach(async () => {
    await _target?.destroy();
  });

  it('should rerender the value', async () => {
    // Arrange.
    const target = await createTestTarget();
    const expected = 25;
    // Act.
    const [, setVal] = await target.current();
    setVal(expected);
    await target.rerender();
    const [val] = await target.current();
    // Assert.
    expect(val).toEqual(expected);
  });
});
