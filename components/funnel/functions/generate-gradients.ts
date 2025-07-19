/**
 * @name hexToRgb
 * @description Converts a hexadecimal color string to an RGB tuple.
 * Handles both shorthand (3 characters) and standard (6 characters) hex formats.
 * @param {string} hex - The hex color string (e.g., "#FFF" or "#FFFFFF").
 * @param {string | number} alpha - Optional alpha value, number from 0 to 100 or percentage string.
 * @returns {[number, number, number]} An array containing the RGB representation of the color.
 */
export function hexToRgb(
  hex: string,
  alpha: string | number = 100,
): [number, number, number, number] {
  let r = 0,
    g = 0,
    b = 0,
    a = parseFloat(alpha?.toString()) / 100;
  if (hex.startsWith('#')) hex = hex.substring(1);
  if (!/^([0-9A-F]{3}){1,2}$|^([0-9A-F]{4}){1,2}$/i.test(hex)) {
    throw new Error('Invalid hex color format');
  }
  if (hex.length === 3 || hex.length === 4) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
    if (hex.length === 4) {
      a = parseInt(hex[3] + hex[3], 16) / 255;
    }
  } else if (hex.length === 6 || hex.length === 8) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    if (hex.length === 8) {
      a = parseInt(hex.substring(6, 8), 16) / 255;
    }
  }
  return [r, g, b, a];
}
/**
 * @name interpolateColor
 * @description Interpolates between two RGB color arrays to find a color at a given factor along the gradient between them.
 * @param {number[]} color1 - The first RGB color array.
 * @param {number[]} color2 - The second RGB color array.
 * @param {number} factor - The position between the two colors (0.0 - 1.0).
 * @returns {number[]} The interpolated RGB color array.
 */
export function interpolateColor(
  color1: [number, number, number, number],
  color2: [number, number, number, number],
  factor: number,
): [number, number, number, number] {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * factor), // Red
    Math.round(color1[1] + (color2[1] - color1[1]) * factor), // Green
    Math.round(color1[2] + (color2[2] - color1[2]) * factor), // Blue
    parseFloat((color1[3] + (color2[3] - color1[3]) * factor).toFixed(2)), // Alpha, ensuring it remains a float
  ];
}

/**
 * Checks if the input color string is in hex format.
 * @param {string} color - The color string to check.
 * @returns {boolean} True if the color is hex, otherwise false.
 */
function isHexColor(color: string): boolean {
  return (
    /^#([0-9A-F]{3}){1,2}$/i.test(color) || /^#([0-9A-F]{4}){2}$/i.test(color)
  );
}

/**
 * Converts a hex color string to an RGBA tuple or returns an RGBA tuple if the input is already in rgba format.
 * @param {string} color - The color string in hex or rgba format.
 * @param {string | number} alpha - Optional alpha value, number from 0 to 100 or percentage string, only used if hex is provided.
 * @returns {[number, number, number, number]} An array containing the RGBA representation of the color.
 */
export function parseColor(
  color: string,
  alpha: string | number = 100,
): [number, number, number, number] {
  if (isHexColor(color)) {
    return hexToRgb(color, alpha);
  } else {
    const rgbaMatch =
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.?\d*))?\)/i.exec(color);
    if (rgbaMatch) {
      return [
        parseInt(rgbaMatch[1]),
        parseInt(rgbaMatch[2]),
        parseInt(rgbaMatch[3]),
        rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1, // default alpha to 1 if not specified
      ];
    }
  }
  throw new Error('Invalid color format');
}

interface GradientStep {
  start: string;
  end: string;
}

/**
 * @name generateGradientSteps
 * @description Generates a series of gradient steps between two hex colors.
 * @param {string} startColor - The starting hex color.
 * @param {string} endColor - The ending hex color.
 * @param {number} steps - The number of steps or gradients to generate.
 * @returns {GradientStep[]} An array of gradient steps where each step includes a start and end RGB color.
 */
export function generateGradientSteps(
  startColor: string,
  endColor: string,
  steps: number,
  startAlpha: number | string = 100,
  endAlpha: number | string = 100,
): GradientStep[] {
  const startRgb = parseColor(startColor, startAlpha);
  const endRgb = parseColor(endColor, endAlpha);
  return Array.from({ length: steps }, (_, i) => {
    const factor = i / steps;
    const interpolatedStart = interpolateColor(startRgb, endRgb, factor);
    const interpolatedEnd = interpolateColor(
      startRgb,
      endRgb,
      factor + 1 / steps,
    );
    return {
      start: `rgba(${interpolatedStart.join(',')})`,
      end: `rgba(${interpolatedEnd.join(',')})`,
    };
  });
}

/**
 * @name lightenOrDarkenHexColor
 * @description Creates a new hex value based on the passed in hex color and a percentage to lighten or darken it.
 * @param {string} hex - The starting hex color.
 * @param {number} percent - The ending hex color.
 * @returns {string} The new hex color.
 */
export function lightenOrDarkenHexColor(hex: string, percent: number): string {
  // Ensure input is a valid hex color
  const isValidHex = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex);
  if (!isValidHex) {
    throw new Error('Invalid hex color.');
  }

  // Remove the hash if it's there
  hex = hex.replace(/^#/, '');

  // If it's a shorthand hex (e.g., #FFF), convert it to full form (e.g., #FFFFFF)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('');
  }

  // Parse the hex values to get red, green, and blue
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calculate the new RGB values, capping at 0-255
  r = Math.min(255, Math.max(0, Math.floor(r * (1 + percent / 100))));
  g = Math.min(255, Math.max(0, Math.floor(g * (1 + percent / 100))));
  b = Math.min(255, Math.max(0, Math.floor(b * (1 + percent / 100))));

  // Convert the new values back to hex and return the new color
  const newHex =
    '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2);

  return newHex.toUpperCase();
}
