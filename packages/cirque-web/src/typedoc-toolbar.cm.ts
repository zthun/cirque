import {
  ZCircusActBuilder,
  ZCircusComponentModel,
  ZCircusKeyboardQwerty,
  ZCircusWaitOptionsBuilder
} from '@zthun/cirque';

export class ZTypedocToolbarComponentModel extends ZCircusComponentModel {
  public static readonly Selector = 'header.tsd-page-toolbar';

  private _title() {
    return this.driver.select('a.title');
  }

  public async title() {
    const _t = await this._title();
    return await _t.text();
  }

  public async home() {
    const _t = await this._title();
    const clickHome = new ZCircusActBuilder().build();
    await _t.perform(clickHome);
  }

  public async search(phrase: string) {
    const waits = new ZCircusWaitOptionsBuilder().debounce(1000).build();
    const button = await this.driver.select('.tsd-toolbar-icon.search svg');
    const searchFocus = new ZCircusActBuilder().click().build();
    await button.perform(searchFocus);

    const typePhrase = new ZCircusActBuilder().type(phrase).build();
    await this.driver.perform(typePhrase);
    await this.driver.wait(() => true, waits);
    const commit = new ZCircusActBuilder().press(ZCircusKeyboardQwerty.enter).build();
    await this.driver.perform(commit);
    await this.driver.wait(() => true, waits);
  }
}
