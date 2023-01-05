/**
 * Flushes an event loop.
 *
 * @returns
 *        A promise that resolves after the flush completes.
 */
export function flush(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1));
}
