import { IZCircusDriver, IZCircusSetup } from '@zthun/cirque';
import { Builder, By, WebDriver } from 'selenium-webdriver';
import { ZCircusDriver } from '../driver/circus-driver';

/**
 * Represents a necessary setup that can open a browser.
 */
export abstract class ZCircusSetupBrowser implements IZCircusSetup<IZCircusDriver> {
  private _acceptInsecureCerts = false;
  private _driver: WebDriver | null = null;

  /**
   * Initializes a new instance of this object.
   *
   * @param browser -
   *        The browser key.
   * @param url -
   *        The url to open when the browser opens.
   */
  public constructor(public readonly url: string) {}

  /**
   * Releases the driver and destroys it.
   */
  public async destroy(): Promise<void> {
    await this._driver?.quit();
    this._driver = null;
  }

  /**
   * Sets the flag to accept insecure certs.
   *
   * @param value -
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
   * Constructs the starting builder for this browser.
   *
   * @returns
   *        The starting builder for this browser.
   */
  public abstract builder(): Builder;

  /**
   * Constructs a new browser window and navigates to it.
   *
   * @returns
   *        The driver that can be used to query the browser.
   *        This will point to the html element on the page.
   */
  public async setup(): Promise<IZCircusDriver> {
    if (this._driver == null) {
      const builder = this.builder();
      const capabilities = builder.getCapabilities();
      const driver = builder.withCapabilities(capabilities.setAcceptInsecureCerts(this._acceptInsecureCerts)).build();
      await driver.get(this.url);
      this._driver = driver;
    }

    const root = this._driver.findElement(By.css('html'));
    return new ZCircusDriver(this._driver, root);
  }
}
