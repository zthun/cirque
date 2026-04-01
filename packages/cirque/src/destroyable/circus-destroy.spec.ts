import { describe, expect, it } from "vitest";
import { mock } from "vitest-mock-extended";

import { type IZCircusDestroy, ZCircusDestroy } from "./circus-destroy.mjs";

describe("ZCircusDestroy", () => {
  describe("Sequential", () => {
    it("should destroy all of the destroyable items", async () => {
      // Arrange.
      const a = mock<IZCircusDestroy>();
      const b = mock<IZCircusDestroy>();

      // Act.
      await ZCircusDestroy.sequential(a, null, b, undefined, null);

      // Assert.
      expect(a.destroy).toHaveBeenCalledTimes(1);
      expect(b.destroy).toHaveBeenCalledTimes(1);
    });
  });
});
