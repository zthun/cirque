import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";

import { flush } from "../util/flush.mjs";
import { ZCircusSetupHtmlElement } from "./circus-setup-html-element.mjs";

/**
 * Represents a setup that renders a react component.
 */
export class ZCircusSetupHtml implements IZCircusSetup {
  private _node: ZCircusSetupHtmlElement | null = null;

  /**
   * Gets whether the setup has been initialized.
   *
   * @returns
   *        True if the setup method was invoked and is not destroyed.
   *        False if it was never invoked and this setup has not been
   *        destroyed.
   */
  public async initialized() {
    const _initialized = await this._node?.initialized();
    return !!_initialized;
  }

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
    await this._node?.destroy();
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
    const element = document.createElement("div");
    element.innerHTML = this._html;
    this._node = new ZCircusSetupHtmlElement(element);
    return this._node.setup();
  }
}
