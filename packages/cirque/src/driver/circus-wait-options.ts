/**
 * Represents options for waits.
 */
export interface IZCircusWaitOptions {
  /**
   * The user friendly description for what is being awaited for.
   */
  description?: string;

  /**
   * The amount of time to wait before the first check.
   *
   * This is a bit different than the check polling, since it is useful
   * for waiting for things that happen outside the control of the tester.
   * For example, animations may run for 1 second before your component is
   * really ready to be interacted with.  Your wait may say it's ready
   * because it found the element it was looking for, but if it is animating,
   * certain child components may be out of bounds or non-interactive.
   */
  debounce: number;

  /**
   * The amount of time to wait before the wait option fails.
   */
  timeout: number;
}

/**
 * Represents the builder for wait options.
 */
export class ZCircusWaitOptionsBuilder {
  private _wait: IZCircusWaitOptions;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._wait = {
      debounce: 0,
      timeout: 10000
    };
  }

  /**
   * Sets the description.
   *
   * @param val -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public description(val: string): this {
    this._wait.description = val;
    return this;
  }

  /**
   * Sets the debounce timeout.
   *
   * @param val -
   *        The value to set.
   */
  public debounce(val: number): this {
    this._wait.debounce = val;
    return this;
  }

  /**
   * Sets the timeout.
   *
   * @param val -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public timeout(val: number): this {
    this._wait.timeout = val;
    return this;
  }

  /**
   * Gets the built options.
   *
   * @returns
   *        The built options.
   */
  public build(): IZCircusWaitOptions {
    return { ...this._wait };
  }
}
