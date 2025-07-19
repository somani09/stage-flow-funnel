import { describe, it, expect } from 'vitest';
import { calculateWidths } from './calculate-width';

describe('calculateWidths Function', () => {
  it('should correctly calculate widths for given normalized values', () => {
    const normalizedValues = [1, 5, 10];
    const maxWidth = 300;
    const minWidth = 50;
    const lastSectionWidth = 100;
    const rangeStart = 1;
    const rangeEnd = 10;

    const result = calculateWidths(
      normalizedValues,
      maxWidth,
      minWidth,
      lastSectionWidth,
      rangeStart,
      rangeEnd,
    );
    const expectedWidths = [
      { topWidth: 50, bottomWidth: 161.11 },
      { topWidth: 161.11, bottomWidth: 300 },
      { topWidth: 300, bottomWidth: 100 },
    ];

    expect(result).toEqual(expectedWidths);
  });

  it('should handle edge cases with minimum and maximum widths', () => {
    const normalizedValues = [1, 1, 1];
    const maxWidth = 200;
    const minWidth = 100;
    const rangeStart = 1;
    const rangeEnd = 1;

    const result = calculateWidths(
      normalizedValues,
      maxWidth,
      minWidth,
      100,
      rangeStart,
      rangeEnd,
    );
    const expectedWidths = [
      { topWidth: 100, bottomWidth: 100 },
      { topWidth: 100, bottomWidth: 100 },
      { topWidth: 100, bottomWidth: 100 },
    ];

    expect(result).toEqual(expectedWidths);
  });

  const normalizedValues = [1, 5, 10];
  const maxWidth = 100;
  const minWidth = 20;
  const lastSectionWidth = 50;
  const rangeStart = 1;
  const rangeEnd = 10;

  it('should calculate proportional widths based on normalized values', () => {
    const normalizedValues = [1, 5, 10]; // Ensure this reflects a progressive increase
    const maxWidth = 300;
    const minWidth = 50;
    const lastSectionWidth = 100;
    const rangeStart = 1;
    const rangeEnd = 10;

    const widths = calculateWidths(
      normalizedValues,
      maxWidth,
      minWidth,
      lastSectionWidth,
      rangeStart,
      rangeEnd,
    );

    expect(widths[0].topWidth).toBeGreaterThanOrEqual(minWidth);
    expect(widths[widths.length - 1].bottomWidth).toBe(lastSectionWidth);
    expect(widths[1].topWidth).toBeLessThan(widths[2].topWidth);
  });

  it('should ensure that no widths are below the minimum or above the maximum', () => {
    const widths = calculateWidths(
      normalizedValues,
      maxWidth,
      minWidth,
      lastSectionWidth,
      rangeStart,
      rangeEnd,
    );
    widths.forEach(({ topWidth, bottomWidth }) => {
      expect(topWidth).toBeGreaterThanOrEqual(minWidth);
      expect(topWidth).toBeLessThanOrEqual(maxWidth);
      expect(bottomWidth).toBeGreaterThanOrEqual(minWidth);
      expect(bottomWidth).toBeLessThanOrEqual(maxWidth);
    });
  });

  it('should handle the last section width correctly', () => {
    const widths = calculateWidths(
      normalizedValues,
      maxWidth,
      minWidth,
      lastSectionWidth,
      rangeStart,
      rangeEnd,
    );
    expect(widths[widths.length - 1].bottomWidth).toBe(lastSectionWidth);
  });

  it('should return empty array when no normalized values are provided', () => {
    const widths = calculateWidths(
      [],
      maxWidth,
      minWidth,
      lastSectionWidth,
      rangeStart,
      rangeEnd,
    );
    expect(widths).toEqual([]);
  });
});
