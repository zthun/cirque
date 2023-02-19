import { IZCircusKey } from '../keyboard/circus-key';

export enum ZCircusActionType {
  // Mouse Actions
  MouseDown = 'mouse-down',
  MouseUp = 'mouse-up',
  // Keyboard Actions
  KeyDown = 'key-down',
  KeyUp = 'key-up',
  // Custom Actions
  Magic = 'magic'
}

/**
 * Represents an action with a given context.
 */
export interface IZCircusAction<TContext = any> {
  name: ZCircusActionType;
  context: TContext;
}

/**
 * The context for when clicking a mouse button.
 */
export type ZCircusMouseButton = 'Left' | 'Right' | 'Middle';

/**
 * A function that does something and returns a promise.
 */
export type ZCircusMagicFunction = () => Promise<any>;

/**
 * Gets whether an action is one of the specific types.
 *
 * @param types -
 *        The types to check.
 * @param action -
 *        The action to match.
 *
 * @returns
 *        Positive if the action name is one of the given types.
 */
const _isActionOneOf = (types: ZCircusActionType[], action: IZCircusAction): boolean => {
  const { name } = action;
  return types.indexOf(name) >= 0;
};

/**
 * Gets whether an action represents a keyboard action.
 *
 * @param action -
 *        The action to check.
 *
 * @returns
 *        True if the action represents a key down or key up event.
 *        False otherwise.
 */
export function isKeyboardAction(action: IZCircusAction): action is IZCircusAction<IZCircusKey> {
  return _isActionOneOf([ZCircusActionType.KeyDown, ZCircusActionType.KeyUp], action);
}

/**
 * Gets whether an action represents a mouse action.
 *
 * @param action -
 *        The action to check.
 *
 * @returns
 *        True if the action represents a mouse event.
 */
export function isMouseAction(action: IZCircusAction): action is IZCircusAction<ZCircusMouseButton> {
  return _isActionOneOf([ZCircusActionType.MouseDown, ZCircusActionType.MouseUp], action);
}

/**
 * Gets whether an action represents magic.
 *
 * @param action -
 *        The action to check.
 *
 * @returns
 *        True if the action represents a magic event.
 */
export function isMagicAction(action: IZCircusAction): action is IZCircusAction<ZCircusMagicFunction> {
  return _isActionOneOf([ZCircusActionType.Magic], action);
}
