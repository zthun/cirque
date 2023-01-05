import { IZCircusAct } from '../performance/circus-act';

/**
 * Represents a driver that manages search and action criteria on a page object model.
 */
export interface IZCircusDriver {
  /**
   * Destroys the driver session.
   *
   * This releases all memory and items used by the driver.
   * If nothing is used, then this may do nothing.
   */
  destroy(): Promise<void>;

  /**
   * Returns an attribute of the driver.
   *
   * @param attribute
   *        The attribute to retrieve.
   *
   * @returns
   *        The attribute value, or null if no such value exists.
   */
  attribute<T extends string>(attribute: string): Promise<T | null>;

  /**
   * Returns an attribute of the driver.
   *
   * @param attribute
   *        The attribute to retrieve.
   * @param fallback
   *        The fallback value in case the attribute is not set.
   *
   * @returns
   *        The attribute value, or null if no such value exists.
   */
  attribute<T extends string>(attribute: string, fallback: T): Promise<T>;

  /**
   * Gets the tag (node name) of the driver context.
   *
   * @returns
   *        The tag of the driver context.
   */
  tag(): Promise<string>;

  /**
   * Returns a list of classes on the driver context that
   * match a given filter.
   *
   * @param filter
   *        The filter of classes you want to check for. If you
   *        just want to get all classes, then just use undefined here.
   *
   * @returns
   *        The list of classes that match the filter.
   */
  classes(filter?: string[]): Promise<string[]>;

  /**
   * Gets the underlying text of the driver context.
   *
   * @returns
   *        The underlying text of the driver context.  Returns
   *        the empty string if no text exists.
   */
  text(): Promise<string>;

  /**
   * Gets the underlying value of the driver context if there is one.
   *
   * @returns
   *        The underlying value of the driver context if there
   *        is one.  Returns null if the driver does not support
   *        a value.
   */
  value(): Promise<string | null>;

  /**
   * Gets whether the value of the driver context is selected.
   *
   * @returns
   *        True if the context is in a selected state.  False otherwise.
   */
  selected(): Promise<boolean>;

  /**
   * Gets whether the context described by this driver is disabled.
   *
   * @returns
   *        True if the driver context is disabled.  False if enabled.
   */
  disabled(): Promise<boolean>;

  /**
   * Looks at the app structure to see if a css selector will produce any results.
   *
   * @param selector
   *        The selector to check.
   *
   * @returns
   *        True if the selector will result in one or more results.
   *        False otherwise.
   */
  peek(selector: string): Promise<boolean>;

  /**
   * Selects a single item under the driver that matches the css selector.
   *
   * @param selector
   *        The selector to query.
   *
   * @returns
   *        A resolved promise with the first item found if the selector produces
   *        one or more results.  Returns a rejected promise if the selector
   *        returns no items.
   */
  select(selector: string): Promise<IZCircusDriver>;

  /**
   * Selects all items under this driver that matches the css selector.
   *
   * @param selector
   *        The selector to query.
   *
   * @returns
   *        A promise that resolves with all items found from the selector.
   *        If no items are found, then an empty array is returned.
   */
  query(selector: string): Promise<IZCircusDriver[]>;

  /**
   * Jumps to the body element.
   *
   * This is useful if you are opening modals
   * and popups that don't exist from withing the
   * driver context.
   *
   * @returns
   *        A new driver that contains the document
   *        body as the context.
   */
  body(): Promise<IZCircusDriver>;

  /**
   * Jumps to the focused element.
   *
   * @returns
   *        A new driver that contains the focused
   *        element, or null if there is no element focused.
   */
  focused(): Promise<IZCircusDriver | null>;

  /**
   * Performs an action against the driver context.
   *
   * @param act
   *        The act to perform.
   */
  perform(act: IZCircusAct): Promise<void>;

  /**
   * Waits for a certain condition to be met before continuing.
   *
   * @param predicate
   *        The predicate to wait for.
   * @param description
   *        The optional friendly text that describes what the
   *        engine is waiting for.
   */
  wait(predicate: () => boolean | Promise<boolean>, description?: string): Promise<void>;
}
