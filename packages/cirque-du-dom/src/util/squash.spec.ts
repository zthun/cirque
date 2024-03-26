// cspell: disable

import { IZCircusAct, ZCircusActBuilder, ZCircusActionType, ZCircusKeyboardQwerty } from '@zthun/cirque';
import { beforeEach, describe, expect, it, Mocked, vitest } from 'vitest';
import { squash } from './squash';

describe('Squash', () => {
  let user: Mocked<any>;
  let element: HTMLElement;

  beforeEach(() => {
    user = {};
    user.keyboard = vitest.fn();
    user.pointer = vitest.fn();

    element = document.createElement('input');
  });

  describe('Keyboard', () => {
    const shouldSquashTo = (expected: string, act: IZCircusAct) => {
      // Arrange
      const actual = squash(user, act, element);
      // Act
      const [action] = actual.actions;
      expect(action.name).toEqual(ZCircusActionType.Magic);
      action.context();
      // Assert.
      expect(user.keyboard).toHaveBeenCalledWith(expected);
    };

    it('should squash actions together into a single string', () => {
      const expected = 'actions should squash with appropriate keys.';
      const act = new ZCircusActBuilder().type(expected).build();
      shouldSquashTo(expected, act);
    });

    it('should squash keys and auto modify with the shift key', () => {
      const text = 'actions should auto modify with the shift key being held';
      const expected = `{Shift>}${text.toUpperCase()}{/Shift}`;
      const act = new ZCircusActBuilder()
        .keyDown(ZCircusKeyboardQwerty.shiftLeft)
        .type(text.toLowerCase())
        .keyUp(ZCircusKeyboardQwerty.shiftLeft)
        .build();

      shouldSquashTo(expected, act);
    });

    it('should squash keys and auto modify with the caps key', () => {
      const text = 'actions should auto modify with the caps lock key toggled';
      const expected = `{CapsLock}${text.toUpperCase()}{CapsLock}`;
      const act = new ZCircusActBuilder()
        .press(ZCircusKeyboardQwerty.capsLock)
        .type(text.toLowerCase())
        .press(ZCircusKeyboardQwerty.capsLock)
        .build();
      shouldSquashTo(expected, act);
    });

    it('should reverse the caps if the caps lock key is pressed and the shift key is held', () => {
      const text = 'caps lock should reverse with the shift key';
      const expected = `{CapsLock}{Shift>}${text.toLowerCase()}{/Shift}{CapsLock}`;
      const act = new ZCircusActBuilder()
        .press(ZCircusKeyboardQwerty.capsLock)
        .keyDown(ZCircusKeyboardQwerty.shiftRight)
        .type(text)
        .keyUp(ZCircusKeyboardQwerty.shiftRight)
        .press(ZCircusKeyboardQwerty.capsLock)
        .build();
      shouldSquashTo(expected, act);
    });

    it('should ignore redundant shift clicks', () => {
      const textA = 'Shift clicks should act as a stack';
      const textB = ' and release when Finished';
      const expected = `{Shift>}{Shift>}S{/Shift}HIFT CLICKS SHOULD ACT AS A STACK{/Shift} and release when {Shift>}F{/Shift}inished`;
      const act = new ZCircusActBuilder()
        .keyDown(ZCircusKeyboardQwerty.shiftLeft)
        .type(textA)
        .keyUp(ZCircusKeyboardQwerty.shiftLeft)
        .type(textB)
        .build();
      shouldSquashTo(expected, act);
    });
  });

  describe('Mouse', () => {
    it('should sqaush to a left click', () => {
      // Arrange
      const act = new ZCircusActBuilder().click().build();
      // Act
      const actual = squash(user, act, element);
      actual.actions.forEach((a) => a.context());
      // Assert
      expect(user.pointer).toHaveBeenCalledWith(expect.objectContaining({ keys: '[MouseLeft>]', target: element }));
      expect(user.pointer).toHaveBeenCalledWith(expect.objectContaining({ keys: '[/MouseLeft]', target: element }));
    });

    it('should squash to a right click', () => {
      // Arrange
      const act = new ZCircusActBuilder().rightClick().build();
      // Act
      const actual = squash(user, act, element);
      actual.actions.forEach((a) => a.context());
      // Assert
      expect(user.pointer).toHaveBeenCalledWith(expect.objectContaining({ keys: '[MouseRight>]', target: element }));
      expect(user.pointer).toHaveBeenCalledWith(expect.objectContaining({ keys: '[/MouseRight]', target: element }));
    });

    it('should squash to a shift click', () => {
      // Arrange
      const act = new ZCircusActBuilder()
        .keyDown(ZCircusKeyboardQwerty.shiftLeft)
        .click()
        .keyUp(ZCircusKeyboardQwerty.shiftLeft)
        .build();
      // Act.
      const actual = squash(user, act, element);
      actual.actions.forEach((a) => a.context());
      // Assert
      expect(user.keyboard).toHaveBeenCalledWith('{Shift>}');
      expect(user.pointer).toHaveBeenCalledWith(expect.objectContaining({ keys: '[MouseLeft>]', target: element }));
      expect(user.pointer).toHaveBeenCalledWith(expect.objectContaining({ keys: '[/MouseLeft]', target: element }));
      expect(user.keyboard).toHaveBeenCalledWith('{/Shift}');
    });
  });

  describe('Magic', () => {
    it('should be kept', () => {
      // Arrange
      const magic = vitest.fn();
      magic.mockResolvedValue(true);
      const act = new ZCircusActBuilder().magic(magic).build();
      // Act
      const actual = squash(user, act, element);
      actual.actions.forEach((a) => a.context());
      // Assert
      expect(magic).toHaveBeenCalled();
    });
  });
});
