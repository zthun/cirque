import { IZCircusDriver } from '../driver/circus-driver';

/**
 * Represents a helper class to construct component models in a common way.
 */
export abstract class ZCircusComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param driver -
   *        The driver that manages this component.
   */
  public constructor(public readonly driver: IZCircusDriver) {}
}

/**
 * Represents the type for a circus component model.
 */
export type ZCircusComponentConstructor<T extends ZCircusComponentModel> = {
  /**
   * The selector that can be used to query
   * any of the components on the current driver context.
   */
  Selector: string;

  /**
   * Initializes a new instance of this object.
   *
   * @param driver -
   *        The driver that represents the root of the component.
   *
   * @returns
   *        A new instance of the component model.
   */
  new (driver: IZCircusDriver): T;
};
