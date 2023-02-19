/* eslint-disable valid-jsdoc */
import { RenderHookResult } from '@testing-library/react';
import { flush } from '../util/flush';

/**
 * Represents a driver for a react hook.
 */
export interface IZCircusReactHook<T, P> {
  /**
   * Destroys the hook.
   *
   * This call is optional.  Hooks will
   * be destroyed automatically when the test
   * framework is unmounted.  This is useful
   * for testing use cases of a hook after the parent
   * component has been unmounted.
   */
  destroy(): Promise<void>;

  /**
   * Returns the current state of the data.
   *
   * @returns
   *        The current value.
   */
  current(): Promise<T>;

  /**
   * Rerenders the underlying hook and gives the results.
   *
   * @returns
   *        The current value after the render.
   */
  rerender(props?: P): Promise<T>;
}

/**
 * An implementation of an IZReactHook that wraps the result from
 * \@testing-library/react.
 */
export class ZCircusReactHook<T, P> implements IZCircusReactHook<T, P> {
  /**
   * Initializes a new instance of this object.
   *
   * @param _result -
   *        The render result.
   */
  public constructor(private _result: RenderHookResult<T, P>) {}

  public destroy(): Promise<void> {
    this._result.unmount();
    return new Promise((resolve) => setTimeout(resolve, 1));
  }

  public current(): Promise<T> {
    return Promise.resolve(this._result.result.current);
  }

  public async rerender(props?: P): Promise<T> {
    this._result.rerender(props);
    await flush();
    return this.current();
  }
}
