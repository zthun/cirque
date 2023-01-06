/* eslint-disable valid-jsdoc */
import { Browser, Builder, Capabilities } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { ZCircusSetupBrowser } from './circus-setup-browser';

/**
 * A setup module for the chrome driver.
 */
export class ZCircusSetupChrome extends ZCircusSetupBrowser {
  private _headless = false;

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
   * Sets the headless flag.
   *
   * @param value
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public headless(value = true): this {
    this._headless = value;
    return this;
  }

  /**
   * @inheritdoc
   */
  public builder(): Builder {
    const builder = new Builder().forBrowser(Browser.CHROME).withCapabilities(Capabilities.chrome());
    let options = new Options();

    if (this._headless) {
      options = options.addArguments('--headless');
    }

    return builder.setChromeOptions(options);
  }
}
