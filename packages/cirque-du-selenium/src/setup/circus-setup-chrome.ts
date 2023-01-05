import { IZCircusDriver, IZCircusSetup } from '@zthun/cirque';
import { Browser, Builder, By, Capabilities } from 'selenium-webdriver';
import { ZCircusDriver } from '../driver/circus-driver';

/**
 * A setup module for the chrome web driver.
 */
export class ZCircusSetupChrome implements IZCircusSetup<IZCircusDriver> {
  /**
   * Initializes a new instance of this object.
   *
   * @param url
   *        The url to route to.
   */
  public constructor(public readonly url: string) {
    require('chromedriver');
  }

  /**
   * Constructs a new browser window and navigates to it.
   */
  public async setup(): Promise<IZCircusDriver> {
    const options = Capabilities.chrome();
    options.setAcceptInsecureCerts(true);
    const driver = new Builder().forBrowser(Browser.CHROME).withCapabilities(options).build();
    await driver.get(this.url);
    const root = driver.findElement(By.css('html'));
    return new ZCircusDriver(driver, root);
  }
}
