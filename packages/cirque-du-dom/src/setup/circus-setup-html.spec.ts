import { afterEach, describe, expect, it } from "vitest";
import { ZCircusSetupHtml } from "./circus-setup-html.mjs";

describe("ZCircusSetupHtml", () => {
  let _target: ZCircusSetupHtml;

  const createTestTarget = () => {
    const html = `<div>Test Div</div>`;

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
