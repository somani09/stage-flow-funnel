import {
  FunnelColorConfig,
  FunnelStage,
  SvgData,
} from "../types-and-interfaces";
import { calculateWidths } from "./calculate-width";
import { generateGradientSteps } from "./generate-gradients";
import { normalizeValues } from "./normalize";

/**
 * @name createSvgData
 * @description Creates SVG data for each section of a funnel chart based on input funnel data and container dimensions.
 * Each SVG section requires top and bottom widths, and gradient start and end.
 * It first normalizes values twice to ensure a balanced distribution and remove skewness from KPI data, then calculates widths and gradient steps to avoid piping of smaller values
 * for visual representation in a funnel chart.
 * @param {FunnelStage[]} funnelData - An array of data objects representing each funnel section. This is used to extract KPI values
 * @param {number} containerWidth - The maximum width available for the funnel, typically the width of the container element.
 * @param {number} minSectionWidth - The minimum width that any section of the funnel should have.
 * @param {number} lastSectionWidth - The width of the bottom-most (last) section of the funnel, set explicitly.
 * @returns {SvgData[]} An array of objects, each containing the necessary data to render an SVG representation of a funnel section.
 */

export function createSvgData(
  funnelData: FunnelStage[],
  containerWidth: number,
  minSectionWidth: number,
  lastSectionWidth: number,
  colorConfig?: FunnelColorConfig,
): SvgData[] {
  // Extract values and find the smallest non-zero value
  const values = funnelData.map((data) =>
    data.value !== null ? Number(data.value) : null,
  );
  const nonNullValues = values.filter((value) => value !== null) as number[];
  const smallestValue = Math.min(...nonNullValues);

  // Replace null values with half of the smallest non-zero value
  const processedValues = values.map((value) =>
    value !== null ? value : smallestValue / 2,
  );

  // Normalize the values
  const normalizedValues = normalizeValues(
    normalizeValues(processedValues, 1, 10),
    1,
    10,
  ); // Double normalizing values, first to a range of 1 to 20, and then to a range of 1 to 10

  // Calculate widths based on normalized values
  const maxWidth = containerWidth;
  const minWidth = minSectionWidth; // minimum width for any section
  const widths = calculateWidths(
    normalizedValues,
    maxWidth,
    minWidth,
    lastSectionWidth,
    1,
    10,
  );

  const gradientStartHex = colorConfig?.gradientStart || "#C9DEF4";
  const gradientEndHex = colorConfig?.gradientEnd || "#F5CCD4";
  const startAlpha = colorConfig?.startAlpha ?? "100%";
  const endAlpha = colorConfig?.endAlpha ?? "100%";

  const gradientSteps = generateGradientSteps(
    gradientStartHex,
    gradientEndHex,
    funnelData.length,
    startAlpha,
    endAlpha,
  );

  // Create SVG data array
  return funnelData.map((data, index) => ({
    id: data.stageId,
    topWidth: widths[index].topWidth,
    bottomWidth: widths[index].bottomWidth,
    gradientStart: gradientSteps[index].start,
    gradientEnd: gradientSteps[index].end,
  }));
}
