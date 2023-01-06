import { ZCircusActBuilder, ZCircusWaitOptionsBuilder } from '@zthun/cirque';
import { noop } from 'lodash';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZCircusSetupRenderer } from '../setup/circus-setup-renderer';
import { ZCircusDriver } from './circus-driver';

const NAME = 'friendly-neighborhood-spider-man';
const TEXT = 'I am your friendly neighborhood Spider Man';
const VALUE = 'My name is Peter Parker';

describe('ZCircusDriver (React)', () => {
  let _driver: ZCircusDriver;

  const createTestTarget = async () => {
    const element = (
      <div className='root' data-name={NAME}>
        <input value={VALUE} onChange={noop} />
        <button disabled />
        <span>{TEXT}</span>
        <button name='clickable' onClick={noop} />
        <input type='checkbox' checked={true} onChange={noop} />
      </div>
    );
    _driver = (await new ZCircusSetupRenderer(element).setup()) as ZCircusDriver;
    return _driver.select('.root');
  };

  afterEach(async () => {
    await _driver?.destroy();
  });

  describe('Monkey patches', () => {
    it('should enable the getBoundingClientRect on the element', async () => {
      // Arrange.
      await createTestTarget();
      // Act.
      const actual = _driver.element.getBoundingClientRect();
      // Assert.
      expect(actual.width).toBeGreaterThan(0);
      expect(actual.height).toBeGreaterThan(0);
    });
  });

  describe('Attributes', () => {
    it('should return the attribute value if it exists', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act.
      const actual = await target.attribute('data-name');
      // Asset.
      expect(actual).toEqual(NAME);
    });

    it('should return the fallback if the attribute does not exist', async () => {
      // Arrange.
      const target = await createTestTarget();
      const expected = 'i-am-error';
      // Act.
      const actual = await target.attribute('data-value', expected);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should return null if the attribute does not exist and there is no fallback', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.attribute('data-value');
      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe('Tags', () => {
    it('should return the node name.', async () => {
      // Arrange
      const target = await createTestTarget();
      const span = await target.select('span');
      const input = await target.select('input');
      // Act
      const spanName = await span.tag();
      const inputName = await input.tag();
      // Assert
      expect(spanName).toEqual('SPAN');
      expect(inputName).toEqual('INPUT');
    });
  });

  describe('Classes', () => {
    it('should return all classes if no filter is provided.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const classes = await target.classes();
      // Assert.
      expect(classes).toEqual(['root']);
    });

    it('should return classes that match the filter.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const classes = await target.classes(['root']);
      // Assert.
      expect(classes).toEqual(['root']);
    });

    it('should not return any classes that do not match the filter.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act.
      const classes = await target.classes(['no', 'still-no']);
      // Assert.
      expect(classes).toEqual([]);
    });
  });

  describe('Text', () => {
    it('should return the underlying text nodes of the driver', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.text();
      // Assert.
      expect(actual).toEqual(TEXT);
    });

    it('should return the empty string if the element has no text content', async () => {
      // Arrange.
      const target = await createTestTarget();
      const input = await target.select('input');
      // Act.
      const actual = await input.text();
      // Assert.
      expect(actual).toEqual('');
    });
  });

  describe('Value', () => {
    it('should return the underlying value if there is one.', async () => {
      // Arrange.
      const target = await createTestTarget();
      const input = await target.select('input');
      // Act.
      const actual = await input.value();
      // Assert.
      expect(actual).toEqual(VALUE);
    });

    it('should return the fallback if the node does not support a value.', async () => {
      // Arrange
      const target = await createTestTarget();
      const span = await target.select('span');
      const expected = 'I am still valid';
      // Act.
      const actual = await span.value(expected);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should return null if the node does not support a value and there is no fallback.', async () => {
      // Arrange
      const target = await createTestTarget();
      const span = await target.select('span');
      // Act.
      const actual = await span.value();
      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe('Selected', () => {
    const shouldBeChecked = async (expected: boolean, query: string) => {
      // Arrange
      const target = await createTestTarget();
      const element = await target.select(query);
      // Act
      const actual = await element.selected();
      // Assert
      expect(actual).toEqual(expected);
    };

    it('should return true if the element is checked', async () => {
      await shouldBeChecked(true, 'input[type="checkbox"]');
    });

    it('should return false if the element is not checked', async () => {
      await shouldBeChecked(false, 'input');
    });
  });

  describe('Disabled', () => {
    const shouldReturnDisabled = async (expected: boolean, query: string) => {
      // Arrange.
      const target = await createTestTarget();
      const element = await target.select(query);
      // Act.
      const actual = await element.disabled();
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should return true if the element has the disabled attribute', async () => {
      await shouldReturnDisabled(true, 'button');
    });

    it('should return false if the element is not disabled.', async () => {
      await shouldReturnDisabled(false, 'input');
    });
  });

  describe('Peek', () => {
    const shouldReturnExists = async (expected: boolean, query: string) => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.peek(query);
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should return true if the query would return an element.', async () => {
      await shouldReturnExists(true, 'button');
    });

    it('should return false if the query does not match any elements.', async () => {
      await shouldReturnExists(false, 'button[type="submit"]');
    });
  });

  describe('Query', () => {
    it('should return all elements that match the query', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.query('button');
      // Assert.
      expect(actual.length).toEqual(2);
    });

    it('should return the empty list if no elements match a query', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.query('header');
      // Assert.
      expect(actual).toEqual([]);
    });
  });

  describe('Body', () => {
    it('should switch to the body element.', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const body = await target.body();
      const actual = await body.tag();
      // Assert.
      expect(actual).toEqual('BODY');
    });
  });

  describe('Focused', () => {
    it('should get the focused element.', async () => {
      // Arrange.
      const target = await createTestTarget();
      const element = await target.select('input');
      const act = new ZCircusActBuilder().click().build();
      await element.perform(act);
      // Act.
      const actual = await (await target.focused())?.tag();
      // Assert.
      expect(actual).toEqual('INPUT');
    });
  });

  describe('Select', () => {
    it('should return the matched element.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.select('button');
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should return a rejected promise if there is no matching element.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act.
      const actual = target.select('.does-not-exist');
      // Assert.
      await expect(actual).rejects.toBeTruthy();
    });
  });

  describe('Wait', () => {
    it('should return once the predicate is true.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act.
      // Assert.
      await expect(target.wait(() => true)).resolves.toBeFalsy();
    });

    it('should reject if the predicate never resolves.', async () => {
      // Arrange
      const target = await createTestTarget();
      const options = new ZCircusWaitOptionsBuilder().timeout(10).build();
      // Act.
      // Assert
      await expect(target.wait(() => false, options)).rejects.toBeTruthy();
    });
  });
});
