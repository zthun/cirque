import { describe, expect, it } from 'vitest';
import { ZCircusWaitOptionsBuilder } from './circus-wait-options';

describe('ZCircusWaitOptions', () => {
  const createTestTarget = () => new ZCircusWaitOptionsBuilder();

  it('should set the description', () => {
    const expected = 'Waiting on something to complete';
    expect(createTestTarget().description(expected).build().description).toEqual(expected);
  });

  it('should set the debounce', () => {
    const expected = 1500;
    expect(createTestTarget().debounce(expected).build().debounce).toEqual(expected);
  });

  it('should set the timeout', () => {
    const expected = 2000;
    expect(createTestTarget().timeout(expected).build().timeout).toEqual(expected);
  });
});
