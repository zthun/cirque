import { IZCircusDriver, IZCircusSetup } from '@zthun/cirque';
import { Builder, By, Capabilities } from 'selenium-webdriver';
import { ZCircusDriver } from '../driver/circus-driver';

/**
 * Represents a necessary setup that can open a browser.
 */
export abstract class ZCircusSetupBrowser implements IZCircusSetup<IZCircusDriver> {
  private _acceptInsecureCerts = false;

  /**
   * Initializes a new instance of this object.
   *
   * @param browser
   *        The browser key.
   * @param url
   *        The url to open when the browser opens.
   */
  public constructor(public readonly browser: string, public readonly url: string) {}

  /**
   * Sets the flag to accept insecure certs.
   *
   * @param value
   *        The flag value to set.
   *
   * @returns
   *        A self reference to this object.
   */
  public acceptInsecureCerts(value = true): this {
    this._acceptInsecureCerts = value;
    return this;
  }

  /**
   * Constructs the appropriate capabilities for this browser.
   *
   * @returns The capabilities for the browser.
   */
  public abstract capabilities(): Capabilities;

  /**
   * Constructs a new browser window and navigates to it.
   *
   * @returns
   *        The driver that can be used to query the browser.
   *        This will point to the html element on the page.
   */
  public async setup(): Promise<IZCircusDriver> {
    const options = this.capabilities().setAcceptInsecureCerts(this._acceptInsecureCerts);
    const driver = new Builder().forBrowser(this.browser).withCapabilities(options).build();
    await driver.get(this.url);
    const root = driver.findElement(By.css('html'));
    return new ZCircusDriver(driver, root);
  }
}
