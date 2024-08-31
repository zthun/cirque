import { render, RenderOptions, RenderResult } from '@testing-library/react/pure';
import { IZCircusDriver, IZCircusSetup } from '@zthun/cirque';
import { ZCircusDriver } from '@zthun/cirque-du-dom';
import { ReactElement } from 'react';

/**
 * Represents a setup that renders a react component.
 */
export class ZCircusSetupRenderer implements IZCircusSetup<IZCircusDriver> {
  private _result: RenderResult | null = null;

  /**
   * Initializes a new instance of this object.
   *
   * @param _element -
   *        The react element to render.
   * @param _options -
   *        The options for the render.
   */
  public constructor(
    private _element: ReactElement,
    private _options?: RenderOptions<any, any, any>
  ) {
    // We will flush the event loops ourselves.  Trying to mingle this with @testing-library
    // is a mess.  So we will just turn all this off.
    global.IS_REACT_ACT_ENVIRONMENT = false;
  }

  public async destroy() {
    this._result?.unmount();
    this._result = null;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  public async setup(): Promise<IZCircusDriver> {
    this._result = render(this._element, this._options);
    await new Promise((resolve) => setTimeout(resolve, 1));
    return new ZCircusDriver(this._result.container);
  }
}
