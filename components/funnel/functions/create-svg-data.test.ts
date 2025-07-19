import { describe, it, expect } from 'vitest';
import { createSvgData } from './create-svg-data';
import type { FunnelStage } from '@mm-common';

describe('createSvgData', () => {
  // Corrected funnel data with proper structure
  const funnelDataMock: FunnelStage[] = [
    { stageId: 1, stageConversionName: 'section 1', value: 10000 },
    { stageId: 2, stageConversionName: 'section 2', value: 7000 },
    { stageId: 3, stageConversionName: 'section 3', value: 3000 },
  ];
  const containerWidth = 500;
  const minSectionWidth = 50;
  const lastSectionWidth = 100;

  it('correctly processes funnel data into SVG data', () => {
    const result = createSvgData(
      funnelDataMock,
      containerWidth,
      minSectionWidth,
      lastSectionWidth,
    );

    // Assertions for output structure
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(funnelDataMock.length);
    result.forEach((item, index) => {
      expect(item).toHaveProperty('id', funnelDataMock[index].stageId);
      expect(item.topWidth).toBeGreaterThanOrEqual(minSectionWidth);
      expect(item).toHaveProperty('gradientStart');
      expect(item).toHaveProperty('gradientEnd');
      if (index === funnelDataMock.length - 1) {
        expect(item.bottomWidth).toBe(lastSectionWidth);
      }
    });
  });

  it('handles empty funnel data gracefully', () => {
    const emptyResult = createSvgData(
      [],
      containerWidth,
      minSectionWidth,
      lastSectionWidth,
    );
    expect(emptyResult).toEqual([]);
  });
});
