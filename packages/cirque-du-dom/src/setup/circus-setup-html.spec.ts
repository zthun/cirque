import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import { afterEach, describe, expect, it } from "vitest";
import { ZCircusSetupHtml } from "./circus-setup-html.mjs";

class ZCircusTestComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZCircusTest-root";
}

describe("ZCircusSetupHtml", () => {
  let _target: ZCircusSetupHtml;

  const createTestTarget = () => {
    const cls = "ZCircusTest-root ZCircusTest-target";
    const html = `<div class="${cls}">Test Div</div>`;

    _target = new ZCircusSetupHtml(html);
    return _target;
  };

  afterEach(async () => {
    await _target?.destroy?.call(_target);
  });

  describe("Destroy", () => {
    it("should not do anything if the setup was never complete", async () => {
      // Arrange.
      const target = createTestTarget();

      // Act.
      await target.destroy();
      await target.destroy();
      const actual = await target.initialized();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should destroy the setup", async () => {
      // Arrange.
      const target = createTestTarget();
      const driver = await target.setup();

      // Act.
      await driver.destroy?.call(driver);
      await target.destroy();
      const actual = await target.initialized();

      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Setup", () => {
    it("should parse the html", async () => {
      // Arrange.
      const target = createTestTarget();
      const driver = await target.setup();

      // Act.
      const [actual] = await ZCircusBy.all(
        driver,
        ZCircusTestComponentModel,
        ".ZCircusTest-target",
      );
      await driver.destroy?.call(driver);

      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should initialize the driver", async () => {
      // Arrange.
      const target = createTestTarget();

      // Act.
      const driver = await target.setup();
      await driver.destroy?.call(driver);
      const actual = await target.initialized();

      // Assert.
      expect(actual).toBeTruthy();
    });
  });
});
