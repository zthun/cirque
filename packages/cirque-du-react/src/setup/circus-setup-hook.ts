import { renderHook, RenderHookOptions } from '@testing-library/react';
import { IZCircusSetup } from '@zthun/cirque';
import { IZCircusReactHook, ZCircusReactHook } from '../driver/circus-react-hook';

/**
 * Represents a setup mechanism that renders a react hook.
 */
export class ZCircusSetupHook<T, P> implements IZCircusSetup<IZCircusReactHook<T, P>> {
  /**
   * Initializes a new instance of this object.
   */
  public constructor(private _render: (props: P) => T, private _options?: RenderHookOptions<any, any, any>) {
    // We will flush the event loops ourselves.  Trying to mingle this with @testing-library
    // is a mess.  So we will just turn all this off.
    global.IS_REACT_ACT_ENVIRONMENT = false;
  }

  /**
   * Renders the hook and returns the result.
   *
   * @returns
   *      The hook driver to retrieve the current value.
   */
  public async setup(): Promise<IZCircusReactHook<T, P>> {
    const result = renderHook<T, P>(this._render, this._options);
    await new Promise((resolve) => setTimeout(resolve, 1));
    return new ZCircusReactHook(result);
  }
}
