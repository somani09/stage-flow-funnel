import { useEffect, useRef, useState } from "react";
import { createSvgData } from "./functions/create-svg-data";
import SVGCreator from "./svg-creator";
import { cn } from "@/app/utils";
import { FunnelStage, SvgData } from "./types-and-interfaces";

interface FunnelProps {
  funnelData: FunnelStage[];
  selectedStage: FunnelStage | undefined;
  handleSelection: (selection: FunnelStage) => void;
  className?: string;
  minSectionWidth?: number;
  lastSectionWidth?: number;
}

const Funnel = ({
  funnelData,
  selectedStage,
  handleSelection,
  className = "",
  minSectionWidth = 200,
  lastSectionWidth = 100,
}: FunnelProps) => {
  // Data and functions required for SVG component
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
        setContainerHeight(entry.contentRect.height);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Setting/Creating SVGData on changing width or height
  const [svgData, setSvgData] = useState<SvgData[]>([]);

  useEffect(() => {
    const generatedSvgData: SvgData[] = createSvgData(
      funnelData,
      containerWidth,
      minSectionWidth,
      lastSectionWidth,
    );
    setSvgData(generatedSvgData);
  }, [funnelData, containerWidth, containerHeight]);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div className="relative top-0 left-0 w-full">
        {svgData.map((data) => (
          <div key={data.id} className="w-full">
            <SVGCreator
              id={data.id}
              topWidth={data.topWidth}
              bottomWidth={data.bottomWidth}
              height={
                containerHeight / funnelData.length - 2 > 0
                  ? containerHeight / funnelData.length - 2
                  : 0
              }
              gradientStart={
                data.id === selectedStage?.stageId
                  ? "rgba(160, 68, 255, 1)"
                  : data.gradientStart
              }
              gradientEnd={
                data.id === selectedStage?.stageId
                  ? "rgba(107, 48, 149, 1)"
                  : data.gradientEnd
              }
              containerWidth={containerWidth}
            />
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 flex w-full flex-col items-center justify-center">
        {funnelData.map((data, index) => (
          <div
            onClick={() => handleSelection(data)}
            className={cn(
              "mb-0.5 flex cursor-pointer flex-col items-center justify-center",
            )}
            style={{
              height: containerHeight / funnelData.length - 2,
              width: Math.min(
                svgData[index]?.bottomWidth || 0,
                svgData[index]?.topWidth || 0,
              ),
            }}
            key={data.stageId}
          >
            <p
              className={cn(
                "text-wraps 3xl:text-base p-0 text-center text-sm font-medium",
                data.stageId === selectedStage?.stageId
                  ? "text-mm-neutral-1-50"
                  : "text-mm-secondary-900",
              )}
            >
              {data.stageConversionName}
            </p>
            <p
              className={cn(
                "3xl:text-[26px] p-0 text-2xl font-semibold",
                data.stageId === selectedStage?.stageId
                  ? "text-mm-neutral-1-50"
                  : "text-mm-secondary-950",
              )}
            >
              {data.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Funnel;
