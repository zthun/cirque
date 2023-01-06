import { describe, expect, it } from 'vitest';
import { isKeyboardAction, isMagicAction, isMouseAction, IZCircusAction, ZCircusActionType } from './circus-action';

describe('ZCircusAction', () => {
  const shouldBeAction = (
    expected: boolean,
    type: ZCircusActionType,
    guard: (action: IZCircusAction<any>) => boolean
  ) => {
    // Arrange.
    const action: IZCircusAction<any> = { name: type, context: null };
    // Act.
    const actual = guard(action);
    // Assert.
    expect(actual).toEqual(expected);
  };

  describe('Keyboard', () => {
    it('should be for KeyUp', () => {
      shouldBeAction(true, ZCircusActionType.KeyUp, isKeyboardAction);
    });

    it('should be for KeyDown', () => {
      shouldBeAction(true, ZCircusActionType.KeyDown, isKeyboardAction);
    });

    it('should not be for MouseUp', () => {
      shouldBeAction(false, ZCircusActionType.MouseUp, isKeyboardAction);
    });

    it('should not be for MouseDown', () => {
      shouldBeAction(false, ZCircusActionType.MouseDown, isKeyboardAction);
    });

    it('should not be for Magic', () => {
      shouldBeAction(false, ZCircusActionType.Magic, isKeyboardAction);
    });
  });

  describe('Mouse', () => {
    it('should not be for KeyUp', () => {
      shouldBeAction(false, ZCircusActionType.KeyUp, isMouseAction);
    });

    it('should not be for KeyDown', () => {
      shouldBeAction(false, ZCircusActionType.KeyDown, isMouseAction);
    });

    it('should be for MouseUp', () => {
      shouldBeAction(true, ZCircusActionType.MouseUp, isMouseAction);
    });

    it('should be for MouseDown', () => {
      shouldBeAction(true, ZCircusActionType.MouseDown, isMouseAction);
    });

    it('should not be for Magic', () => {
      shouldBeAction(false, ZCircusActionType.Magic, isMouseAction);
    });
  });

  describe('Magic', () => {
    it('should not be for KeyUp', () => {
      shouldBeAction(false, ZCircusActionType.KeyUp, isMagicAction);
    });

    it('should not be for KeyDown', () => {
      shouldBeAction(false, ZCircusActionType.KeyDown, isMagicAction);
    });

    it('should not be for MouseUp', () => {
      shouldBeAction(false, ZCircusActionType.MouseUp, isMagicAction);
    });

    it('should not be for MouseDown', () => {
      shouldBeAction(false, ZCircusActionType.MouseDown, isMagicAction);
    });

    it('should be for Magic', () => {
      shouldBeAction(true, ZCircusActionType.Magic, isMagicAction);
    });
  });
});
