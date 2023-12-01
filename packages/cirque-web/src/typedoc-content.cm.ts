import { ZCircusComponentModel } from '@zthun/cirque';

export class ZTypedocContentComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.col-content';

  public async title(): Promise<string> {
    const _title = await this.driver.select('.tsd-page-title h1,.tsd-page-title h2');
    return _title.text();
  }
}
