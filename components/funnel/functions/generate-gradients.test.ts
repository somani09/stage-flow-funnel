import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  parseColor,
  generateGradientSteps,
  interpolateColor,
} from './generate-gradients';

describe('Color Conversion Functions', () => {
  it('should convert hex to RGBA', () => {
    expect(hexToRgb('#FF00FF', '50')).toEqual([255, 0, 255, 0.5]);
    expect(hexToRgb('#FFF')).toEqual([255, 255, 255, 1]);
    expect(parseColor('rgba(255, 0, 255, 0.5)')).toEqual([255, 0, 255, 0.5]);
  });

  it('converts standard 6-digit hex to RGBA', () => {
    expect(hexToRgb('#FFFFFF')).toEqual([255, 255, 255, 1]);
  });

  it('converts shorthand 3-digit hex to RGBA', () => {
    expect(hexToRgb('#FFF')).toEqual([255, 255, 255, 1]);
  });

  it('handles alpha value as number correctly', () => {
    expect(hexToRgb('#FFFFFF', 50)).toEqual([255, 255, 255, 0.5]);
  });

  it('handles alpha value as percentage string correctly', () => {
    expect(hexToRgb('#FFFFFF', '50%')).toEqual([255, 255, 255, 0.5]);
  });

  it('throws an error on invalid hex format', () => {
    expect(() => hexToRgb('ZZZ')).toThrow('Invalid hex color format');
  });
});

describe('interpolateColor', () => {
  it('interpolates correctly between two colors', () => {
    expect(interpolateColor([255, 0, 0, 1], [0, 0, 255, 0], 0.5)).toEqual([
      128, 0, 128, 0.5,
    ]);
  });

  it('returns start color at factor 0', () => {
    expect(interpolateColor([255, 255, 255, 1], [0, 0, 0, 0], 0)).toEqual([
      255, 255, 255, 1,
    ]);
  });

  it('returns end color at factor 1', () => {
    expect(interpolateColor([255, 255, 255, 1], [0, 0, 0, 0], 1)).toEqual([
      0, 0, 0, 0,
    ]);
  });
});

describe('parseColor', () => {
  it('parses hex color correctly', () => {
    expect(parseColor('#FF0000')).toEqual([255, 0, 0, 1]);
  });

  it('parses RGBA string correctly', () => {
    expect(parseColor('rgba(255, 0, 0, 0.5)')).toEqual([255, 0, 0, 0.5]);
  });

  it('throws an error on unrecognized color format', () => {
    expect(() => parseColor('blue')).toThrow('Invalid color format');
  });
});

describe('Gradient Generation Function', () => {
  it('should generate gradient steps correctly', () => {
    const startColor = '#FFFFFF';
    const endColor = '#000000';
    const steps = 3;
    const expectedGradients = [
      { start: 'rgba(255,255,255,1)', end: 'rgba(170,170,170,1)' },
      { start: 'rgba(170,170,170,1)', end: 'rgba(85,85,85,1)' },
      { start: 'rgba(85,85,85,1)', end: 'rgba(0,0,0,1)' },
    ];
    const gradients = generateGradientSteps(startColor, endColor, steps);
    expect(gradients).toEqual(expectedGradients);
  });

  it('generates the correct number of gradient steps', () => {
    const gradients = generateGradientSteps('#FF0000', '#00FF00', 10);
    expect(gradients).toHaveLength(10);
  });

  it('correctly calculates start and end colors for steps', () => {
    const gradients = generateGradientSteps('#FF0000', '#0000FF', 1);
    expect(gradients[0].start).toBe('rgba(255,0,0,1)');
    expect(gradients[0].end).toBe('rgba(0,0,255,1)');
  });
});
