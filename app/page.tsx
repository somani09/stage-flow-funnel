"use client";

import { useEffect, useRef, useState } from "react";
import Funnel from "@/components/funnel/funnel";
import { dummyFunnelData3 } from "@/components/funnel/configs";
import {
  FunnelColorConfig,
  FunnelStage,
} from "@/components/funnel/types-and-interfaces";
import { cn } from "./utils";
import { funnelColorConfigs, pageConfig } from "./config";
import InfoPanel from "./info-panel";

const Home = () => {
  const [funnelData, setFunnelData] = useState(dummyFunnelData3);
  const [selectedStage, setSelectedStage] = useState<FunnelStage | undefined>(
    funnelData[2],
  );
  const [funnelHeight, setFunnelHeight] = useState<number | null>(null);
  const funnelRef = useRef<HTMLDivElement>(null);

  const [colorConfig, setColorConfig] = useState<FunnelColorConfig>(
    funnelColorConfigs[2].config,
  );

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!funnelRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const currentHeight = entry.contentRect.height;

      // only update if height is different (avoids update loops)
      setFunnelHeight((prev) =>
        Math.abs((prev ?? 0) - currentHeight) > 1 ? currentHeight : prev,
      );
    });

    observer.observe(funnelRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollHeight = funnelHeight
    ? `${funnelHeight - 180 > 0 ? funnelHeight - 180 : 100}px`
    : "300px";

  return (
    <div className="flex h-max min-h-screen flex-col pt-12 pr-4 pb-6 pl-32 sm:pr-32">
      <h1 className="text-primary text-4xl font-bold lg:text-6xl">
        {pageConfig.title}
      </h1>

      <div className="text-secondary relative mt-6 text-sm sm:text-lg">
        <div
          className={cn(
            "relative transition-[max-height] duration-500 ease-in-out sm:max-h-none sm:overflow-visible",
            isExpanded ? "overflow-visible" : "overflow-hidden",
          )}
          style={{
            maxHeight: isExpanded ? "none " : "2.5rem",
          }}
        >
          <p>{pageConfig.description}</p>

          {!isExpanded && (
            <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-white to-transparent sm:hidden" />
          )}
        </div>

        <div className="mt-1 flex justify-end sm:hidden">
          <button
            className="text-primary text-xs font-semibold underline"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Read less ↑" : "Read more ↓"}
          </button>
        </div>
      </div>

      <div className="bg-accent-1 mt-8 mb-8 h-0.5 max-w-48 rounded-full" />

      <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row">
        <div
          ref={funnelRef}
          className="relative flex min-w-[200px] flex-1 lg:w-[30%] lg:min-w-[300px]"
        >
          <Funnel
            key={JSON.stringify(colorConfig)}
            funnelData={funnelData}
            selectedStage={selectedStage}
            handleSelection={setSelectedStage}
            colorConfig={colorConfig}
            className="h-full min-h-[500px] w-full"
          />
        </div>

        <InfoPanel
          funnelHeight={funnelHeight}
          scrollHeight={scrollHeight}
          funnelData={funnelData}
          setFunnelData={setFunnelData}
          setSelectedStage={setSelectedStage}
          colorConfig={colorConfig}
          setColorConfig={setColorConfig}
        />
      </div>
    </div>
  );
};

export default Home;
