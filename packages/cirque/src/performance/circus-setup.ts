/**
 * Represents a step to setup the circus.
 */
export interface IZCircusSetup<T> {
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
