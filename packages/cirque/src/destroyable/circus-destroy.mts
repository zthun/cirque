/**
 * Represents an object that can potentially be destroyed.
 */
export interface IZCircusDestroy {
  /**
   * Destroys the session.
   *
   * This releases all memory and items used by this object.
   * If nothing is used, then this may do nothing.
   */
  destroy?: () => Promise<void>;
}

/**
 * A helper object that allows you to run the destroy command
 * on multiple objects.
 */
export abstract class ZCircusDestroy {
  /**
   * Runs destroy on every destructible object that can be destroyed.
   *
   * This way of destruction is dependant on order.
   *
   * @param destructible -
   *        The list of objects to destroy.  If any of these are null or
   *        undefined, then that object is skipped.
   */
  public static async sequential(
    ...destructible: (IZCircusDestroy | undefined | null)[]
  ) {
    // Order matters here, so we destroy them one at a time instead of all at once.
    for (const destroyable of destructible) {
      await destroyable?.destroy?.call(destroyable);
    }
  }
}
