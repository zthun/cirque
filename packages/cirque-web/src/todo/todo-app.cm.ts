import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZChecklistComponentModel } from './checklist/checklist.cm';

/**
 * Represents the component model for the ZTodoApp
 */
export class ZTodoAppComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTodoApp-root';

  /**
   * Gets the component model for the today list.
   *
   * @returns
   *        The component model for the today list.
   */
  public today(): Promise<ZChecklistComponentModel> {
    return ZCircusBy.first(this.driver, ZChecklistComponentModel, 'today');
  }

  /**
   * Gets the component model for the tomorrow list.
   *
   * @returns
   *        The component model for the tomorrow list.
   */
  public tomorrow(): Promise<ZChecklistComponentModel> {
    return ZCircusBy.first(this.driver, ZChecklistComponentModel, 'tomorrow');
  }

  /**
   * Gets the component model for the future list if available.
   *
   * @returns
   *        The component model for the future list, or null if
   *        it is not available.
   */
  public future(): Promise<ZChecklistComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZChecklistComponentModel, 'future');
  }
}
