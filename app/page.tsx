"use client";

import { useEffect, useRef, useState } from "react";
import Funnel from "@/components/funnel/funnel";
import { aboutConfigs, dummyFunnelData3 } from "@/components/funnel/configs";
import { FunnelStage } from "@/components/funnel/types-and-interfaces";
import { cn } from "./utils";
import { pageConfig } from "./page-config";
import InfoPanel from "./info-panel";

const Home = () => {
  const [funnelData, setFunnelData] = useState(dummyFunnelData3);
  const [selectedStage, setSelectedStage] = useState<FunnelStage | undefined>(
    funnelData[2],
  );
  const [funnelHeight, setFunnelHeight] = useState<number | null>(null);
  const funnelRef = useRef<HTMLDivElement>(null);

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

  const scrollHeight = funnelHeight ? `${funnelHeight - 180}px` : "300px"; // adjust for title, buttons, padding

  return (
    <div className="flex h-max min-h-screen flex-col pt-12 pr-4 pb-6 pl-32 sm:pr-32">
      <h1 className="text-primary text-4xl font-bold lg:text-6xl">
        {pageConfig.title}
      </h1>

      <p className="text-secondary mt-6 text-sm sm:text-lg">
        {pageConfig.description}
      </p>

      <div className="bg-accent-1 mt-4 mb-8 h-0.5 max-w-48 rounded-full" />

      {/* Main Layout */}
      <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row">
        {/* Funnel Panel */}
        <div
          ref={funnelRef}
          className="relative flex min-w-[200px] flex-1 lg:w-[30%] lg:min-w-[300px]"
        >
          <Funnel
            funnelData={funnelData}
            selectedStage={selectedStage}
            handleSelection={setSelectedStage}
            className="h-full min-h-[500px] w-full"
          />
        </div>

        {/* Info Panel */}
        <InfoPanel
          funnelHeight={funnelHeight}
          scrollHeight={scrollHeight}
          funnelData={funnelData}
          setFunnelData={setFunnelData}
          setSelectedStage={setSelectedStage}
        />
      </div>
    </div>
  );
};

export default Home;
