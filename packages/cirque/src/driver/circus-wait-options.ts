/**
 * Represents options for waits.
 */
export interface IZCircusWaitOptions {
  /**
   * The user friendly description for what is being awaited for.
   */
  description?: string;
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
