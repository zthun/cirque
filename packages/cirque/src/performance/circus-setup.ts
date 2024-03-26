import { IZCircusDriver } from '../driver/circus-driver';

/**
 * Represents a step to setup the circus.
 *
 * @param T -
 *        The type of data the setup will return.  Defaults
 *        to a circus driver.
 */
export interface IZCircusSetup<T = IZCircusDriver> {
  /**
   * Releases and cleans up any items used by this setup.
   */
  destroy?(): Promise<void>;

  /**
   * Sets up the circus environment.
   *
   * @returns
   *        The result from the setup.
   */
  setup(): Promise<T>;
}
