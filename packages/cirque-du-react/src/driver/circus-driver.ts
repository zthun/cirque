/* eslint-disable valid-jsdoc */

import { RenderResult, waitFor } from '@testing-library/react/pure';
import UserEvent from '@testing-library/user-event';
import { IZCircusAct, IZCircusDriver } from '@zthun/cirque';
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
   * @param result
   *        The render result.
   * @param element
   *        The element to wrap.
   */
  public constructor(public readonly result: RenderResult, public readonly element: HTMLElement) {
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
      } as unknown as DOMRect);
  }

  /**
   * Destroys the render session.
   */
  public async destroy() {
    this.result.unmount();
    await flush();
  }

  /**
   * @inheritdoc
   */
  public attribute<T extends string>(attribute: string, fallback: T | null = null): Promise<T | null> {
    const attr = this.element.getAttribute(attribute) as T;
    return Promise.resolve(attr == null ? fallback : attr);
  }

  /**
   * @inheritdoc
   */
  public tag(): Promise<string> {
    return Promise.resolve(this.element.nodeName);
  }

  /**
   * @inheritdoc
   */
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

  /**
   * @inheritdoc
   */
  public text(): Promise<string> {
    return Promise.resolve(this.element.textContent || '');
  }

  /**
   * @inheritdoc
   */
  public value(fallback: string): Promise<string>;

  /**
   * @inheritdoc
   */
  public value(): Promise<string | null>;

  /**
   * @inheritdoc
   */
  public value(fallback: string | null = null): Promise<string | null> {
    return Promise.resolve(get(this.element, 'value', fallback));
  }

  /**
   * @inheritdoc
   */
  public selected(): Promise<boolean> {
    return Promise.resolve(get(this.element, 'checked', false));
  }

  /**
   * @inheritdoc
   */
  public disabled(): Promise<boolean> {
    return Promise.resolve(get(this.element, 'disabled', false));
  }

  /**
   * @inheritdoc
   */
  public peek(selector: string): Promise<boolean> {
    return Promise.resolve(!!this.element.querySelector(selector));
  }

  /**
   * @inheritdoc
   */
  public query(selector: string): Promise<IZCircusDriver[]> {
    const elements = Array.from(this.element.querySelectorAll<HTMLElement>(selector));
    return Promise.resolve(elements.map((e) => new ZCircusDriver(this.result, e)));
  }

  /**
   * @inheritdoc
   */
  public body(): Promise<IZCircusDriver> {
    return Promise.resolve(new ZCircusDriver(this.result, document.body));
  }

  /**
   * @inheritdoc
   */
  public focused(): Promise<IZCircusDriver | null> {
    // JSDOM actually just focuses the body so this never actually returns null.
    const active = document.activeElement as HTMLElement;
    return Promise.resolve(new ZCircusDriver(this.result, active));
  }

  /**
   * @inheritdoc
   */
  public async select(selector: string): Promise<IZCircusDriver> {
    const drivers = await this.query(selector);

    if (!drivers.length) {
      return Promise.reject(`No element with selector, ${selector}, could be found.`);
    }

    return drivers[0];
  }

  /**
   * @inheritdoc
   */
  public async perform(act: IZCircusAct): Promise<void> {
    const user = UserEvent.setup({
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

  /**
   * @inheritdoc
   */
  public wait(predicate: () => boolean | Promise<boolean>, description?: string): Promise<void> {
    return waitFor(async () => {
      const result = await predicate();
      return result ? Promise.resolve() : Promise.reject(new Error(description));
    }, {});
  }
}
