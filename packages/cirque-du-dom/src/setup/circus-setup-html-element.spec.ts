import { afterEach, describe, expect, it } from "vitest";

import { ZCircusSetupHtmlElement } from "./circus-setup-html-element.mjs";

describe("ZCircusSetupHtmlElement", () => {
  let _target: ZCircusSetupHtmlElement;

  const createTestTarget = () => {
    _target = new ZCircusSetupHtmlElement(document.createElement("div"));
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

      // Assert.
      expect(driver).toBeTruthy();
    });
  });
});
