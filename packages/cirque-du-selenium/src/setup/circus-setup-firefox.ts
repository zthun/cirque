/* eslint-disable valid-jsdoc */
import { Browser, Capabilities } from 'selenium-webdriver';
import { ZCircusSetupBrowser } from './circus-setup-browser';

/**
 * A setup module for the firefox driver.
 */
export class ZCircusSetupFirefox extends ZCircusSetupBrowser {
  /**
   * Initializes a new instance of this object.
   *
   * @param url
   *        The url to route to.
   */
  public constructor(public readonly url: string) {
    super(Browser.FIREFOX, url);
  }

  /**
   * @inheritdoc
   */
  public capabilities(): Capabilities {
    return Capabilities.firefox();
  }
}
