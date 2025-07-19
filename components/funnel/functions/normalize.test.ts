import { describe, it, expect } from 'vitest';
import { normalizeValues } from './normalize';

describe('normalizeValues', () => {
  it('should scale values correctly to the specified range', () => {
    const values = [1, 2, 3, 4, 5];
    const normalized = normalizeValues(values, 0, 10);
    const expected = [0.0, 3.69, 6.31, 8.34, 10.0];
    normalized.forEach((value, index) => {
      expect(value).toBe(expected[index]);
    });
  });

  it('should handle an empty array without throwing', () => {
    const normalized = normalizeValues([], 0, 10);
    expect(normalized).toEqual([]);
  });

  it('should throw a TypeError if values is not an array', () => {
    const invalidInputs = [123, '123', { 0: 1 }, null, undefined];
    invalidInputs.forEach(input => {
      const action = () => normalizeValues(input as unknown as number[], 0, 10);
      expect(action).toThrow(TypeError);
      expect(action).toThrow('Values must be an array of numbers');
    });
  });

  it('should return an array where all values are the start of the range if all input values are the same', () => {
    const uniformValues = [2, 2, 2, 2, 2];
    const normalized = normalizeValues(uniformValues, 0, 10);
    normalized.forEach(value => {
      expect(value).toBe(0);
    });
  });

  it('should ensure all normalized values fall within the specified range', () => {
    const values = [1, 10, 100, 1000, 10000];
    const start = 1;
    const end = 100;
    const normalized = normalizeValues(values, start, end);
    normalized.forEach(value => {
      expect(value).toBeGreaterThanOrEqual(start);
      expect(value).toBeLessThanOrEqual(end);
    });
  });

  it('should handle values with zeros by adjusting to log(1)', () => {
    const values = [0, 1, 10, 100];
    const normalized = normalizeValues(values, 0, 10);
    expect(normalized[0]).toBe(0);
  });

  it('should handle high variance in values correctly', () => {
    const values = [0.001, 1000];
    const normalized = normalizeValues(values, 0, 1);
    expect(normalized[0]).toBeLessThan(normalized[1]);
    expect(normalized[1]).toBeCloseTo(1, 2);
  });
});
