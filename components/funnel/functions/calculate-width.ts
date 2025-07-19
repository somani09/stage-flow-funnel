import { SvgWidths } from "../types-and-interfaces";

/**
 * @name calculateWidths
 * @description Calculates the top and bottom widths for each SVG section based on normalized values.
 * The widths are adjusted to ensure sections are visually proportional based on the
 * given range, with the last section width being set explicitly.
 * @param {number[]} normalizedValues - values from Funnel data(KPIs) normalized to a scale of 1 to 10.
 * @param {number} maxWidth - width of the container.
 * @param {number} minWidth - minimum with that any svg's top or bottom can be assigned
 * @param {number} lastSectionWidth - width of the last SVG's bottom.
 * @param {number} rangeStart - start value of the range for normalized values
 * @param {number} rangeEnd - end value of the range for normalized values
 * @returns {SvgWidths[]} - array of object, each object contains topWidth and bottomWidth
 */
export function calculateWidths(
  normalizedValues: number[],
  maxWidth: number,
  minWidth: number,
  lastSectionWidth: number = 100,
  rangeStart: number,
  rangeEnd: number,
): SvgWidths[] {
  const splits: number = rangeEnd - rangeStart; // Calculate the range difference

  if (splits === 0) {
    // If there is no range difference, avoid division by zero by returning fixed widths
    return normalizedValues.map((_, index, arr) => {
      const topWidth = minWidth; // Default to minWidth when no range
      const bottomWidth = index < arr.length - 1 ? minWidth : lastSectionWidth; // Last bottomWidth is lastSectionWidth
      return { topWidth, bottomWidth };
    });
  }

  // Normal calculation when there is a valid range
  return normalizedValues.map((value, index, arr) => {
    const topWidth = +(
      minWidth +
      ((value - 1) * (maxWidth - minWidth)) / splits
    ).toFixed(2);
    let bottomWidth;
    if (index < arr.length - 1) {
      bottomWidth = +(
        minWidth +
        ((arr[index + 1] - 1) * (maxWidth - minWidth)) / splits
      ).toFixed(2);
    } else {
      bottomWidth = +lastSectionWidth.toFixed(2);
    }
    return { topWidth, bottomWidth };
  });
}
