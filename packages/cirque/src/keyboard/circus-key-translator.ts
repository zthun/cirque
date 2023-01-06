import { IZCircusKey } from './circus-key';
import { ZCircusKeyboardQwerty } from './circus-keyboard-qwerty';

/**
 * A translator that can convert from characters and keys to ZCircusKey objects.
 */
export class ZCircusKeyTranslator {
  public static readonly Qwerty = new ZCircusKeyTranslator(Object.values(ZCircusKeyboardQwerty));

  private _lowerCaseToKeyValue = new Map<string, IZCircusKey>();
  private _upperCaseToKeyValue = new Map<string, IZCircusKey>();

  /**
   * Initializes a new instance of this object.
   *
   * @param keys
   *        The collection of keys to support.
   */
  public constructor(keys: IZCircusKey[]) {
    keys.forEach((key) => {
      this._lowerCaseToKeyValue.set(key.lower, key);
      this._upperCaseToKeyValue.set(key.upper, key);
    });
  }

  /**
   * Translates the key or code to a ZCircusKey
   *
   * @param keyOrCode
   *        The code value (upper or lower case) or
   *        keycode value to translate.
   *
   * @returns
   *        The actual key representation of the specified key
   *        or undefined if no such key exists.
   */
  public translate(keyOrCode: string): IZCircusKey | undefined {
    return this._lowerCaseToKeyValue.get(keyOrCode) || this._upperCaseToKeyValue.get(keyOrCode);
  }
}
