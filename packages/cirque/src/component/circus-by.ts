import { IZCircusDriver } from '../driver/circus-driver';
import { ZCircusWaitOptionsBuilder } from '../driver/circus-wait-options';
import { ZCircusComponentConstructor, ZCircusComponentModel } from './circus-component-model';

const _selector = (root: string, name?: string) => {
  let selector = root;

  if (name != null) {
    const byNameAttribute = `${root}[name="${name}"]`;
    const byDataNameAttribute = `${root}[data-name="${name}"]`;
    selector = `${byNameAttribute},${byDataNameAttribute}`;
  }

  return selector;
};

/**
 * Represents a by query language to query the driver by selectors.
 */
export abstract class ZCircusBy {
  /**
   * Finds all components that match a given selector.
   *
   * @param driver -
   *        The driver to search.
   * @param CircusComponentModel -
   *        The model to construct.
   * @param selector -
   *        The optional selector to query.  If this is falsy,
   *        the the component model internal selector is used.
   */
  public static async all<T extends ZCircusComponentModel>(
    driver: IZCircusDriver,
    CircusComponentModel: ZCircusComponentConstructor<T>,
    selector: string = CircusComponentModel.Selector
  ) {
    const target = await driver.query(selector);
    return target.map((t) => new CircusComponentModel(t));
  }

  /**
   * Queries the driver by a specific css selector and
   * returns the first item found.
   *
   * @param driver -
   *        The root driver to query.
   * @param CircusComponentModel -
   *        The model type to construct using the child driver.
   * @param selector -
   *        The css target selector that describes the root of the
   *        CircusComponentModel
   *
   * @returns
   *        A new instance of CircusComponentModel.  If no target
   *        is found, then this method rejects with an Error.
   */
  public static async css<T extends ZCircusComponentModel>(
    driver: IZCircusDriver,
    CircusComponentModel: ZCircusComponentConstructor<T>,
    selector: string
  ): Promise<T> {
    const description = `Searching for a component with selector: ${selector}`;
    const options = new ZCircusWaitOptionsBuilder().description(description).build();
    await driver.wait(() => driver.peek(selector), options);
    const target = await driver.select(selector);
    return new CircusComponentModel(target);
  }

  /**
   * Returns the first discovered component model that matches the inner Selector.
   *
   * @param driver -
   *        The driver to query.
   * @param CircusComponentModel -
   *        The component model to construct.
   * @param name -
   *        The optional name.  If this is falsy,
   *        then the basic selector is used, otherwise
   *        the first component that matches the selector
   *        that also has a "name" or "data-name" attribute
   *        with the matching value.
   *
   * @returns
   *        A new instance of CircusComponentModel.  If no
   *        target is found, then this method rejects with an Error.
   */
  public static first<T extends ZCircusComponentModel>(
    driver: IZCircusDriver,
    CircusComponentModel: ZCircusComponentConstructor<T>,
    name?: string
  ): Promise<T> {
    const selector = _selector(CircusComponentModel.Selector, name);
    return ZCircusBy.css(driver, CircusComponentModel, selector);
  }

  /**
   * Same as first, but returns null if no such component exists.
   *
   * @param driver -
   *        The driver to query.
   * @param CircusComponentModel -
   *        The component model to construct.
   * @param name -
   *        The optional name.
   *
   * @returns
   *        The first component that matches or null if no such component exists.
   */
  public static async optional<T extends ZCircusComponentModel>(
    driver: IZCircusDriver,
    CircusComponentModel: ZCircusComponentConstructor<T>,
    name?: string
  ): Promise<T | null> {
    const selector = _selector(CircusComponentModel.Selector, name);
    const [found] = await driver.query(selector);
    return found ? new CircusComponentModel(found) : null;
  }
}
