import {
  isKeyboardAction,
  isMouseAction,
  IZCircusAct,
  IZCircusAction,
  IZCircusKey,
  ZCircusActBuilder,
  ZCircusActionType,
  ZCircusKeyboardQwerty
} from '@zthun/cirque';

interface KeyboardState {
  leftShift: number;
  rightShift: number;
  caps: boolean;
}

/**
 * Squashes the keyboard events.
 *
 * @param user -
 *        The \@testing-library/user-events object that was setup earlier.
 * @param range -
 *        The range of circus actions to collapse.
 * @param state -
 *        The current state of the keyboard modifier keys.
 *
 * @returns
 *        A new magic action that runs user.keyboard with the given range of actions
 *        translated appropriately.
 */
function squashKeyboardEvents(user: any, range: IZCircusAction[], state: KeyboardState): IZCircusAction {
  const chain: string[] = [];

  for (let i = 0; i < range.length; ++i) {
    const stepAction = range[i];
    const nextAction = range[i + 1];

    const key = stepAction.context as IZCircusKey;
    const nextKey = nextAction?.context as IZCircusKey;

    const upper = state.caps ? stepAction.context.lower : stepAction.context.upper;
    const lower = state.caps ? stepAction.context.upper : stepAction.context.lower;

    const isUpperCase = !!state.leftShift || !!state.rightShift;
    const value = isUpperCase ? upper : lower;

    const isAKeyPress =
      stepAction.name === ZCircusActionType.KeyDown &&
      nextAction?.name === ZCircusActionType.KeyUp &&
      key.code === nextKey?.code;

    if (isAKeyPress) {
      chain.push(key.printable ? value : `{${value}}`);
      ++i;
    } else {
      chain.push(stepAction.name === ZCircusActionType.KeyDown ? `{${value}>}` : `{/${value}}`);
    }

    if (stepAction.name === ZCircusActionType.KeyDown && key.code === ZCircusKeyboardQwerty.capsLock.code) {
      state.caps = !state.caps;
    }

    if (stepAction.name === ZCircusActionType.KeyDown && key.code === ZCircusKeyboardQwerty.shiftLeft.code) {
      state.leftShift++;
    }

    if (stepAction.name === ZCircusActionType.KeyUp && key.code === ZCircusKeyboardQwerty.shiftLeft.code) {
      state.leftShift--;
    }

    if (stepAction.name === ZCircusActionType.KeyDown && key.code === ZCircusKeyboardQwerty.shiftRight.code) {
      state.rightShift++;
    }

    if (stepAction.name === ZCircusActionType.KeyUp && key.code === ZCircusKeyboardQwerty.shiftRight.code) {
      state.rightShift--;
    }
  }

  const name = ZCircusActionType.Magic;
  const context = () => user.keyboard(chain.join(''));

  return { name, context };
}

/**
 * Squashes acts into specific chunks for user-events.
 *
 * @param user -
 *        The user object from \@testing-library/user-events that was setup earlier.
 * @param act -
 *        The circus act to squash.
 * @param element -
 *        The driver element context for click events.
 *
 * @returns
 *        A new circus act that describes the full performance.
 */
export function squash(user: any, act: IZCircusAct, element: HTMLElement): IZCircusAct {
  let newAct = new ZCircusActBuilder();
  const state: KeyboardState = { leftShift: 0, rightShift: 0, caps: false };

  for (let i = 0; i < act.actions.length; ++i) {
    const action = act.actions[i];

    if (isKeyboardAction(action)) {
      let end = i;
      for (end; end < act.actions.length && isKeyboardAction(act.actions[end]); ++end);
      const range = act.actions.slice(i, end);
      newAct = newAct.action(squashKeyboardEvents(user, range, state));
      i = end - 1;
      continue;
    }

    if (isMouseAction(action)) {
      // Mouse actions work properly in user-events - no need to squash anything
      if (action.name === ZCircusActionType.MouseUp) {
        newAct = newAct.magic(() => user.pointer({ keys: `[/Mouse${action.context}]`, target: element }));
      } else {
        newAct = newAct.magic(() => user.pointer({ keys: `[Mouse${action.context}>]`, target: element }));
      }
      continue;
    }

    newAct.action(action);
  }

  return newAct.build();
}
