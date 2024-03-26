import { IZCircusDriver, IZCircusSetup } from '@zthun/cirque';
import { flush } from '../util/flush';
import { ZCircusSetupHtmlElement } from './circus-setup-html-element';

/**
 * Represents a setup that renders a react component.
 */
export class ZCircusSetupHtml implements IZCircusSetup {
  private _node: IZCircusSetup | null = null;

  /**
   * Initializes a new instance of this object.
   *
   * @param _html -
   *        The html string to render under a div container.
   */
  public constructor(private _html: string) {}

  /**
   * Destroys / Removes the element from the DOM.
   */
  public async destroy(): Promise<void> {
    this._node?.destroy?.call(this._node);
    this._node = null;
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
    const element = document.createElement('div');
    element.innerHTML = this._html;
    this._node = new ZCircusSetupHtmlElement(element);
    return this._node.setup();
  }
}
