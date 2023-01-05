import {
  isKeyboardAction,
  isMagicAction,
  isMouseAction,
  IZCircusAct,
  ZCircusActBuilder,
  ZCircusActionType
} from '@zthun/cirque';
import { snakeCase } from 'lodash';
import { Actions, Button, Key } from 'selenium-webdriver';

/**
 * Squashes acts into specific chunks for selenium action sequences.
 *
 * Performances are broken up by magic.
 *
 * @param factory
 *        A factory that creates the starting action.
 * @param act
 *        The circus act to squash.
 *
 * @returns
 *        A new circus act that describes the full performance using only
 *        magic actions.
 */
export function squash(factory: () => Actions, act: IZCircusAct): IZCircusAct {
  let newAct = new ZCircusActBuilder();
  let performance: Actions | null = null;

  for (let i = 0; i < act.actions.length; ++i) {
    const action = act.actions[i];
    performance = performance || factory();

    if (isKeyboardAction(action)) {
      const key = snakeCase(action.context.upper).toUpperCase();
      if (action.name === ZCircusActionType.KeyDown && action.context.modifier) {
        performance.keyDown(Key[key]);
      } else if (action.name === ZCircusActionType.KeyUp && action.context.modifier) {
        performance.keyUp(Key[key]);
      } else if (action.name === ZCircusActionType.KeyDown) {
        // Selenium is limited here.  You can only do modifiers with keyDown and keyUp, everything
        // else has to be with sendKeys, so due to this, we're just going to act on one of them.
        // Since key data is immediately sent once a key is pressed, we will respond to the
        // KeyDown event with no support for repeat keys through press and hold.
        const keys = Key[key] || action.context.lower;
        performance.sendKeys(keys);
      }
    }

    if (isMouseAction(action)) {
      const button: Button = Button[action.context.toUpperCase()];
      if (action.name === ZCircusActionType.MouseUp) {
        performance = performance.release(button);
      } else {
        performance = performance.press(button);
      }
    }

    if (isMagicAction(action) && performance != null) {
      const _performance = performance;
      newAct = newAct.magic(() => _performance.perform());
      performance = null;
    }

    if (isMagicAction(action)) {
      newAct = newAct.action(action);
    }
  }

  if (performance != null) {
    const _performance = performance;
    newAct.magic(() => _performance?.perform());
  }

  return newAct.build();
}
