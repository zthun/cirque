/**
 * Represents a key on a keyboard.
 */
export interface IZCircusKey {
  /**
   * The key value when the shift key is not pressed and
   * the caps lock key is off.
   */
  lower: string;

  /**
   * The key value when the shift key is pressed or the
   * caps lock key is on.
   */
  upper: string;

  /**
   * The keycode of the actual key on the keyboard.
   */
  code: string;

  /**
   * Whether or not the key is printable.
   *
   * Printable keys are keys that can be displayed
   * on a document or printer paper.
   *
   * White space is considered printable so those
   * count here.
   */
  printable: boolean;

  /**
   * Whether or not the key is a modifier key.
   *
   * A modifier key is a key that is meant to be
   * used with other keys.
   */
  modifier: boolean;

  /**
   * A key that modifies the lower case to upper case.
   */
  shift: boolean;

  /**
   * A key that can be toggled on and off.
   */
  toggle: boolean;
}

/**
 * Represents a builder for an IZCircusKey object.
 */
export class ZCircusKeyBuilder {
  private _key: IZCircusKey;

  /**
   * Initializes a new instance of this object.
   *
   * @param key
   *        The key value as a lower case variant.
   * @param code
   *        The key code.
   */
  public constructor(key: string, code: string) {
    this._key = {
      lower: key,
      code,
      upper: key,
      printable: false,
      modifier: false,
      shift: false,
      toggle: false
    };
  }

  /**
   * Sets the upper case variant of this key.
   *
   * @param key
   *        The key to set.
   *
   * @returns
   *        This object.
   */
  public upper(key: string): this {
    this._key.upper = key;
    return this;
  }

  /**
   * Sets the printable flag.
   *
   * @returns
   *        This object.
   */
  public printable(): this {
    this._key.printable = true;
    return this;
  }

  /**
   * Sets the modifier flag.
   *
   * @returns
   *        This object.
   */
  public modifier(): this {
    this._key.modifier = true;
    return this;
  }

  /**
   * Sets the shift flag.
   *
   * @returns
   *        This object.
   */
  public shift(): this {
    this._key.shift = true;
    return this;
  }

  /**
   * Sets the toggle flag.
   *
   * @returns
   *        This object.
   */
  public toggle(): this {
    this._key.toggle = true;
    return this;
  }

  /**
   * Builds the key.
   *
   * @returns
   *      A shallow copy of the built key.
   */
  public build(): IZCircusKey {
    return { ...this._key };
  }
}
