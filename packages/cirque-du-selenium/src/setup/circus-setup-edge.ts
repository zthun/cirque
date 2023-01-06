/* eslint-disable valid-jsdoc */
import { Browser, Builder, Capabilities } from 'selenium-webdriver';
import { ZCircusSetupBrowser } from './circus-setup-browser';

/**
 * A setup module for the edge driver.
 */
export class ZCircusSetupEdge extends ZCircusSetupBrowser {
  /**
   * Initializes a new instance of this object.
   *
   * @param url
   *        The url to route to.
   */
  public constructor(public readonly url: string) {
    super(url);
  }

  /**
   * @inheritdoc
   */
  public builder(): Builder {
    return new Builder().forBrowser(Browser.EDGE).withCapabilities(Capabilities.edge());
  }
}
