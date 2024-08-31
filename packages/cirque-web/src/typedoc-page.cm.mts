import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import { ZTypedocContentComponentModel } from "./typedoc-content.cm.mjs";
import { ZTypedocToolbarComponentModel } from "./typedoc-toolbar.cm.mjs";

export class ZTypedocPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = "body";

  public toolbar(): Promise<ZTypedocToolbarComponentModel> {
    return ZCircusBy.first(this.driver, ZTypedocToolbarComponentModel);
  }

  public content(): Promise<ZTypedocContentComponentModel> {
    return ZCircusBy.first(this.driver, ZTypedocContentComponentModel);
  }
}
