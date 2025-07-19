/**
 * @name normalizeValues
 * @description Normalizes the given array of values to a specified range using logarithmic scaling.
 * This function first applies a logarithmic transformation to each value to reduce the
 * impact of high variances and skewness in the data set. It then normalizes these values
 * to fall within a custom-defined range [start, end].
 * @param {number[]} values - values from Funnel data(KPIs) to be normalized
 * @param {number} start - start of the normalization range
 * @param {number} end - end of the normalization range
 * @returns {number[]} - An array of normalized values scaled to the specified range.
 */

export function normalizeValues(
  values: number[],
  start: number,
  end: number,
): number[] {
  if (
    !Array.isArray(values) ||
    values.some(value => typeof value !== 'number')
  ) {
    throw new TypeError('Values must be an array of numbers');
  }

  // Check for negative values and throw an error if any are found
  if (values.some(value => value < 0)) {
    values = values.map(value => (value < 0 ? 0 : value));
  }

  const logValues = values.map(value => Math.log(value + 1)); // Add 1 to avoid log(0)
  const maxLog = Math.max(...logValues);
  const minLog = Math.min(...logValues);
  const range = end - start;

  // Check if all log values are the same, which leads to division by zero
  if (maxLog === minLog) {
    // All values are the same, return the start value or another appropriate value
    return values.map(() => +start.toFixed(2)); // map all to start of range, formatted to two decimals
  }

  // Normalize values to provided range
  return logValues.map(
    logValue =>
      +(start + ((logValue - minLog) / (maxLog - minLog)) * range).toFixed(2),
  );
}
