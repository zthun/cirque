import type { IZCircusDestroy } from "../destroyable/circus-destroy.mjs";
import type { IZCircusDriver } from "../driver/circus-driver.mjs";

/**
 * Represents a step to setup the circus.
 *
 * @param T -
 *        The type of data the setup will return.  Defaults
 *        to a circus driver.
 */
export interface IZCircusSetup<T = IZCircusDriver> extends IZCircusDestroy {
  /**
   * Sets up the circus environment.
   *
   * @returns
   *        The result from the setup.
   */
  setup(): Promise<T>;
}
