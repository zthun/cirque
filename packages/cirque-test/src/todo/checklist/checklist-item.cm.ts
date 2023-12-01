import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/cirque';

/**
 * Represents the component model for the individual items.
 */
export class ZChecklistItemComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZChecklistItem-root';

  /**
   * Gets the underlying input element that handles the user actions.
   *
   * @returns
   *      The driver for the underlying input element.
   */
  private _input(): Promise<IZCircusDriver> {
    return this.driver.select('input');
  }

  /**
   * Gets the current value of the checklist item.
   *
   * @param value -
   *        The value to set.  If this is undefined, then
   *        no value is changed and the current value is returned.
   *
   * @returns
   *        The current value of the checklist item.
   */
  public async value(value?: string): Promise<string> {
    const input = await this._input();

    if (value != null) {
      await this.clear();
      await this.keyboard(value);
    }

    return input.value('');
  }

  /**
   * Appends value of the item by inputting from the keyboard.
   *
   * If you want to set the entire value, you must use clear
   * following this method, or pass the desired value into the
   * value method.
   *
   * @param value -
   *        The value to set.
   *
   * @returns
   *        The current value.
   */
  public async keyboard(value: string): Promise<string> {
    const act = new ZCircusActBuilder().click().type(value).build();
    await (await this._input()).perform(act);
    return this.value();
  }

  /**
   * Clears the current value.
   *
   * @returns
   *        The current value (should be the empty string).
   */
  public async clear(): Promise<string> {
    const current = await this.value();
    const act = new ZCircusActBuilder()
      .click()
      .press(ZCircusKeyboardQwerty.backspace, current.length)
      .press(ZCircusKeyboardQwerty.delete, current.length)
      .build();
    await (await this._input()).perform(act);
    return this.value();
  }
}
