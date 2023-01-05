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
 * @param types
 *        The types to check.
 * @param action
 *        The action to match.
 *
 * @returns
 *        Positive if the action name is one of the given types.
 */
const _isActionOneOf = (types: ZCircusActionType[], action: IZCircusAction): action is IZCircusAction<any> => {
  const { name } = action;
  return types.indexOf(name) >= 0;
};

type ZKeyboardTypeGuard = (action: IZCircusAction) => action is IZCircusAction<IZCircusKey>;
type ZMouseTypeGuard = (action: IZCircusAction) => action is IZCircusAction<ZCircusMouseButton>;
type ZMagicTypeGuard = (action: IZCircusAction) => action is IZCircusAction<ZCircusMagicFunction>;

/**
 * Gets whether an action represents a keyboard action.
 *
 * @param action
 *        The action to check.
 *
 * @returns
 *        True if the action represents a key down or key up event.
 *        False otherwise.
 */
export const isKeyboardAction = _isActionOneOf.bind(null, [
  ZCircusActionType.KeyDown,
  ZCircusActionType.KeyUp
]) as ZKeyboardTypeGuard;

/**
 * Gets whether an action represents a mouse action.
 *
 * @param action
 *        The action to check.
 *
 * @returns
 *        True if the action represents a mouse event.
 */
export const isMouseAction = _isActionOneOf.bind(null, [
  ZCircusActionType.MouseDown,
  ZCircusActionType.MouseUp
]) as ZMouseTypeGuard;

/**
 * Gets whether an action represents magic.
 *
 * @param action
 *        The action to check.
 *
 * @returns
 *        True if the action represents a magic event.
 */
export const isMagicAction = _isActionOneOf.bind(null, [ZCircusActionType.Magic]) as ZMagicTypeGuard;
