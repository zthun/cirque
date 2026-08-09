import { ZCircusDestroy } from "@zthun/cirque";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { ZCircusSetupHook } from "../setup/circus-setup-hook.mjs";
import type { IZCircusReactHook } from "./circus-react-hook.mjs";

describe("ZCircusReactHook", () => {
  let _target: IZCircusReactHook<
    [number, Dispatch<SetStateAction<number>>],
    never
  >;

  const createTestTarget = async () => {
    // This one is OK -> it's testing something specific.
    // The destructuring happens later in each test
    // eslint-disable-next-line @eslint-react/use-state
    _target = await new ZCircusSetupHook(() => useState(0)).setup();
    return _target;
  };

  afterEach(() => ZCircusDestroy.sequential(_target));

  it("should rerender the value", async () => {
    // Arrange.
    const target = await createTestTarget();
    const expected = 25;
    // Act.
    const [, setVal] = await target.current();
    setVal(expected);
    await target.rerender();
    const [val] = await target.current();
    // Assert.
    expect(val).toEqual(expected);
  });
});
