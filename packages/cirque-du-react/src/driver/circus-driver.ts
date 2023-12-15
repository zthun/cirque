import { RenderResult, waitFor } from '@testing-library/react/pure';
import { userEvent } from '@testing-library/user-event';
import { IZCircusAct, IZCircusDriver, IZCircusWaitOptions, ZCircusWaitOptionsBuilder } from '@zthun/cirque';
import { get, keyBy } from 'lodash';
import { flush } from '../util/flush';
import { squash } from '../util/squash';

/**
 * Represents a circus driver that wraps an html element.
 */
export class ZCircusDriver implements IZCircusDriver {
  /**
   * Initializes a new instance of this object.
   *
   * @param result -
   *        The render result.
   * @param element -
   *        The element to wrap.
   */
  public constructor(
    public readonly result: RenderResult,
    public readonly element: HTMLElement
  ) {
    // JSDOM doesn't actually render anything so whenever we try to get the bounding client
    // rect, it just returns (0, 0, 0, 0).  This messes up stuff that needs calculations
    // on the actual rectangles of the DOM, so we're just going to monkey patch the
    // getBoundingClientRect here.
    element.getBoundingClientRect = () =>
      ({
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        left: 0,
        right: 500,
        top: 0,
        bottom: 25
      }) as unknown as DOMRect;
  }

  /**
   * Destroys the render session.
   */
  public async destroy() {
    this.result.unmount();
    await flush();
  }

  public attribute<T extends string>(attribute: string, fallback: T | null = null): Promise<T | null> {
    const attr = this.element.getAttribute(attribute) as T;
    return Promise.resolve(attr == null ? fallback : attr);
  }

  public tag(): Promise<string> {
    return Promise.resolve(this.element.nodeName);
  }

  public classes(filter?: string[]): Promise<string[]> {
    const list = this.element.classList;
    const all = Array.from(list);

    if (!filter) {
      return Promise.resolve(all);
    }

    const lookup = keyBy(filter);
    const filtered = all.filter((c) => Object.prototype.hasOwnProperty.call(lookup, c));
    return Promise.resolve(filtered);
  }

  public text(): Promise<string> {
    return Promise.resolve(this.element.textContent || '');
  }

  public value(fallback: string): Promise<string>;

  public value(): Promise<string | null>;

  public value(fallback: string | null = null): Promise<string | null> {
    return Promise.resolve(get(this.element, 'value', fallback));
  }

  public selected(): Promise<boolean> {
    return Promise.resolve(get(this.element, 'checked', false));
  }

  public disabled(): Promise<boolean> {
    return Promise.resolve(get(this.element, 'disabled', false));
  }

  public peek(selector: string): Promise<boolean> {
    return Promise.resolve(!!this.element.querySelector(selector));
  }

  public query(selector: string): Promise<IZCircusDriver[]> {
    const elements = Array.from(this.element.querySelectorAll<HTMLElement>(selector));
    return Promise.resolve(elements.map((e) => new ZCircusDriver(this.result, e)));
  }

  public body(): Promise<IZCircusDriver> {
    return Promise.resolve(new ZCircusDriver(this.result, document.body));
  }

  public focused(): Promise<IZCircusDriver | null> {
    // JSDOM actually just focuses the body so this never actually returns null.
    const active = document.activeElement as HTMLElement;
    return Promise.resolve(new ZCircusDriver(this.result, active));
  }

  public async select(selector: string): Promise<IZCircusDriver> {
    const drivers = await this.query(selector);

    if (!drivers.length) {
      return Promise.reject(`No element with selector, ${selector}, could be found.`);
    }

    return drivers[0];
  }

  public async perform(act: IZCircusAct): Promise<void> {
    const user = userEvent.setup({
      // As of 14.4.0, auto modify is not yet implemented, so we will do the modifications ourselves.
      autoModify: false
    });

    // With user events, all events get squashed to magic.
    const _act = squash(user, act, this.element);

    let promise = Promise.resolve();

    _act.actions.forEach((a) => {
      promise = promise.then(() => a.context());
    });

    await promise;
    await flush();
  }

  public async wait(predicate: () => boolean | Promise<boolean>, options?: IZCircusWaitOptions): Promise<void> {
    const _options = options || new ZCircusWaitOptionsBuilder().build();

    await new Promise((r) => setTimeout(r, _options.debounce));

    return waitFor(
      async () => {
        const result = await predicate();
        return result ? Promise.resolve() : Promise.reject(new Error(options?.description));
      },
      { timeout: _options.timeout }
    );
  }
}
