import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";

import { ZChecklistComponentModel } from "./checklist.cm.mjs";
import { ZChecklist } from "./checklist.js";

describe("ZChecklist", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  const createTestTarget = async () => {
    const element = <ZChecklist />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZChecklistComponentModel);
  };

  it("should start as empty", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.empty();
    // Assert.
    expect(actual).toBeTruthy();
  });

  describe("Adding items", () => {
    it("should add an item.", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await target.add();
      const actual = await target.empty();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should add new items to the end of the list", async () => {
      // Arrange.
      const target = await createTestTarget();
      const batman = "Batman";
      const superman = "Superman";
      const flash = "Flash";
      const expected = "Batman;Superman;Flash";
      // Act.
      await target.add(batman);
      await target.add(superman);
      await target.add(flash);
      const items = await target.items();
      const actual = await Promise.all(items.map((item) => item.value()));
      // Assert.
      expect(actual.join(";")).toEqual(expected);
    });
  });
});
