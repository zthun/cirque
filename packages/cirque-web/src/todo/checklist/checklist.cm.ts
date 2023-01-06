import { ZCircusActBuilder, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { last } from 'lodash';
import { ZChecklistItemComponentModel } from './checklist-item.cm';

/**
 * Represents the component model for the checklist component.
 */
export class ZChecklistComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZChecklist-root';

  /**
   * Gets whether the empty text is displayed.
   *
   * @returns
   *        True if the empty text is displayed, false otherwise.
   */
  public async empty(): Promise<boolean> {
    const text = await ZCircusBy.optional(this.driver, ZChecklistItemComponentModel);
    return text == null;
  }

  /**
   * Gets a list of all the current item component models.
   *
   * @returns
   *        A list of all the items currently in the checklist.
   */
  public items(): Promise<ZChecklistItemComponentModel[]> {
    return ZCircusBy.all(this.driver, ZChecklistItemComponentModel);
  }

  /**
   * Clicks the add button.
   *
   * @param value
   *        The value to set automatically.  If this is falsy, then
   *        the current value is kept after adding.
   *
   * @returns
   *        The new item that was just added.
   */
  public async add(value?: string): Promise<ZChecklistItemComponentModel> {
    const addButton = await this.driver.select('.ZChecklist-footer-add-button');
    const action = new ZCircusActBuilder().click().build();
    await addButton.perform(action);
    const items = await this.items();
    const newest = last(items)!;

    if (value == null) {
      return newest;
    }

    await newest.value(value);
    return newest;
  }
}
