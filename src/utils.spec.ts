import { describe, expect, test } from '@jest/globals';
import { getRealIndex } from './utils';
describe('getRealIndex', () => {
  test('init situation', () => {
    const i = getRealIndex(0, 0, 7);
    expect(i).toBe(0);
  });
  test('one clockwise', () => {
    const i = getRealIndex(0, 1, 7);
    expect(i).toBe(1);
  });
  test('next one clockwise', () => {
    const i = getRealIndex(1, 1, 7);
    expect(i).toBe(2);
  });
  test('next one clockwise_1', () => {
    const i = getRealIndex(2, 1, 7);
    expect(i).toBe(3);
  });
  test('click at init point', () => {
    const i = getRealIndex(3, 0, 7);
    expect(i).toBe(3);
  });
  test('click one backwise', () => {
    const i = getRealIndex(3, 6, 7);
    expect(i).toBe(2);
  });
  test('click one backwise_1', () => {
    const i = getRealIndex(2, 6, 7);
    expect(i).toBe(1);
  });
});
