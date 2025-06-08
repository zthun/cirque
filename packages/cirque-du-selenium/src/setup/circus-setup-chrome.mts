import { Browser, Builder, Capabilities } from "selenium-webdriver";
import { ZCircusSetupBrowser } from "./circus-setup-browser.mjs";

/**
 * A setup module for the chrome driver.
 */
export class ZCircusSetupChrome extends ZCircusSetupBrowser {
  private _headless = false;

  /**
   * Initializes a new instance of this object.
   *
   * @param url -
   *        The url to route to.
   */
  public constructor(public readonly url: string) {
    super(url);
  }

  /**
   * Sets the headless flag.
   *
   * @param value -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public headless(value = true): this {
    this._headless = value;
    return this;
  }

  public async builder(): Promise<Builder> {
    const builder = new Builder()
      .forBrowser(Browser.CHROME)
      .withCapabilities(Capabilities.chrome());
    // @ts-expect-error This is a selenium-webdriver problem
    const { Options } = await import("selenium-webdriver/chrome");
    const options = new Options();

    if (this._headless) {
      options.addArguments("--headless").addArguments("--no-sandbox");
    }

    return builder.setChromeOptions(options);
  }
}
