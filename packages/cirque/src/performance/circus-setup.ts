/**
 * Represents a step to setup the circus.
 */
export interface IZCircusSetup<T> {
  /**
   * Sets up the circus environment.
   *
   * @returns
   *        The result from the setup.
   */
  setup(): Promise<T>;
}
