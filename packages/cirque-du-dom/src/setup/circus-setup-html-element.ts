import { IZCircusDriver, IZCircusSetup } from '@zthun/cirque';
import { ZCircusDriver } from '../driver/circus-driver';
import { flush } from '../util/flush';

/**
 * Represents a setup that renders a react component.
 */
export class ZCircusSetupHtmlElement implements IZCircusSetup<IZCircusDriver> {
  private _current: HTMLElement | null;

  /**
   * Initializes a new instance of this object.
   *
   * @param _template -
   *        The node template that will be copied.
   */
  public constructor(private _template: HTMLElement) {}

  /**
   * Destroys / Removes the element from the DOM.
   */
  public async destroy(): Promise<void> {
    this._current?.remove();
    this._current = null;
    await flush();
  }

  /**
   * Renders the element and returns the result once it is ready.
   *
   * @returns
   *      The result of the render. Returns a rejected
   *      result if the render never becomes ready.
   */
  public async setup(): Promise<IZCircusDriver> {
    this._current = this._template.cloneNode(true) as HTMLElement;
    document.body.appendChild(this._current);
    await flush();
    return new ZCircusDriver(this._current);
  }
}
