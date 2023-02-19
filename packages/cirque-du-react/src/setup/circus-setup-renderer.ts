import { render, RenderOptions } from '@testing-library/react/pure';
import { IZCircusDriver, IZCircusSetup } from '@zthun/cirque';
import { ReactElement } from 'react';
import { ZCircusDriver } from '../driver/circus-driver';
import { flush } from '../util/flush';

/**
 * Represents a setup that renders a react component.
 */
export class ZCircusSetupRenderer implements IZCircusSetup<IZCircusDriver> {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element -
   *        The react element to render.
   * @param _options -
   *        The options for the render.
   */
  public constructor(private _element: ReactElement, private _options?: RenderOptions<any, any, any>) {
    // We will flush the event loops ourselves.  Trying to mingle this with @testing-library
    // is a mess.  So we will just turn all this off.
    global.IS_REACT_ACT_ENVIRONMENT = false;
  }

  /**
   * Renders the element and returns the result once it is ready.
   *
   * @returns
   *      The result of the render. Returns a rejected
   *      result if the render never becomes ready.
   */
  public async setup(): Promise<IZCircusDriver> {
    const result = render(this._element, this._options);
    await flush();
    return new ZCircusDriver(result, result.container);
  }
}
