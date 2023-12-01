import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZTypedocContentComponentModel } from './typedoc-content.cm';
import { ZTypedocToolbarComponentModel } from './typedoc-toolbar.cm';

export class ZTypedocPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = 'body';

  public toolbar(): Promise<ZTypedocToolbarComponentModel> {
    return ZCircusBy.first(this.driver, ZTypedocToolbarComponentModel);
  }

  public content(): Promise<ZTypedocContentComponentModel> {
    return ZCircusBy.first(this.driver, ZTypedocContentComponentModel);
  }
}
