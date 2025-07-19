interface SVGCreatorProps {
  id: number | string;
  topWidth: number;
  bottomWidth: number;
  height: number;
  gradientStart: string;
  gradientEnd: string;
  containerWidth: number;
}

const SVGCreator = ({
  id,
  topWidth,
  bottomWidth,
  height,
  gradientStart,
  gradientEnd,
  containerWidth,
}: SVGCreatorProps) => {
  function generateDynamicFunnelPath(
    topWidth: number,
    bottomWidth: number,
    height: number,
  ) {
    const center = containerWidth / 2;
    const topCenter = center; // Assuming the center of the SVG
    const bottomCenter = center;

    // Start and end points for top and bottom
    const topStartX = topCenter - topWidth / 2;
    const topEndX = topCenter + topWidth / 2;
    const bottomStartX = bottomCenter - bottomWidth / 2;
    const bottomEndX = bottomCenter + bottomWidth / 2;

    let pathData = `M${topStartX},0 `; // Move to start at the top left

    // Left curve: Controls ensure curve stays within top and bottom widths
    pathData += `C${topStartX},${height * 0.3} ${bottomStartX},${height * 0.7} ${bottomStartX},${height} `;

    // Bottom line
    pathData += `L${bottomEndX},${height} `;

    // Right curve: Adjusted control points to mirror the left curve accurately
    pathData += `C${bottomEndX},${height * 0.7} ${topEndX},${height * 0.3} ${topEndX},0 `;

    pathData += 'Z'; // Close the path

    return pathData;
  }

  const gradientId = `linear-gradient-${id}`;

  return (
    <svg width={'100%'} height={height} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0" stopColor={gradientStart} />
          <stop offset="1" stopColor={gradientEnd} />
        </linearGradient>
      </defs>
      <path
        d={generateDynamicFunnelPath(topWidth, bottomWidth, height)}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export default SVGCreator;
