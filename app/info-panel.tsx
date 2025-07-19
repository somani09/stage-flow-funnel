import { aboutConfigs } from "@/components/funnel/configs";
import {
  FunnelColorConfig,
  FunnelStage,
} from "@/components/funnel/types-and-interfaces";
import { cn } from "./utils";
import { funnelColorConfigs, pageConfig } from "./config";
import { useMediaQuery } from "./hooks";
import { BsGearFill } from "react-icons/bs";
import ConfigPanel from "./config-panel";
import { useState } from "react";

interface Props {
  funnelHeight: number | null;
  scrollHeight: string;
  funnelData: FunnelStage[];
  setFunnelData: (data: FunnelStage[]) => void;
  setSelectedStage: (stage: FunnelStage | undefined) => void;
  colorConfig: FunnelColorConfig;
  setColorConfig: (config: FunnelColorConfig) => void;
  className?: string;
}

const InfoPanel = ({
  funnelHeight,
  scrollHeight,
  funnelData,
  setFunnelData,
  setSelectedStage,
  colorConfig,
  setColorConfig,
  className,
}: Props) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div
      className={cn(
        "border-primary/10 bg-glass/20 relative flex flex-col gap-6 rounded-xl border p-6",
        "shadow-[0_2px_6px_rgba(1,42,74,0.15),_0_6px_12px_rgba(1,42,74,0.2),_0_12px_24px_rgba(1,42,74,0.25),_0_20px_32px_rgba(1,42,74,0.2),_0_32px_48px_rgba(1,42,74,0.15)]",
        "text-primary min-w-[300px] backdrop-blur-[6px] lg:flex lg:flex-1",
        className,
      )}
      style={{
        maxHeight: isLargeScreen && funnelHeight ? `${funnelHeight}px` : "none",
        height: "max-content",
        overflow: "hidden",
      }}
    >
      <h2 className="text-3xl font-semibold">Implementation Notes</h2>
      <div
        className="border-primary/10 space-y-6 overflow-y-auto border-b-1 pr-2 text-base"
        style={{ maxHeight: scrollHeight }}
      >
        {pageConfig.funnelInfoSections.map(({ title, description }) => (
          <div key={title}>
            <h3 className="text-primary text-lg font-semibold">{title}</h3>
            <p className="text-secondary mt-1">{description}</p>
          </div>
        ))}
        <div>
          View code on GitHub –{" "}
          <a
            href="https://github.com/somani09/stage-flow-funnel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            https://github.com/somani09/stage-flow-funnel
          </a>
        </div>
      </div>
      <div
        className={cn(
          "relative flex items-center justify-start",
          "translate-z-0 transition-opacity duration-300 ease-in-out will-change-[opacity]",
        )}
      >
        <div
          className={cn(
            "transition-opacity duration-300",
            isConfigOpen ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <button
            onClick={() => setIsConfigOpen(true)}
            className="bg-glass/30 text-secondary border-secondary shadowDepthPrimary hover:bg-glass/50 rounded-full border-2 p-2 backdrop-blur-[4px] transition-all hover:shadow-lg"
          >
            <BsGearFill className="h-4 w-4" />
          </button>
          <span className="text-primary ml-2 text-base font-semibold">
            Configure Funnel
          </span>
        </div>
        <ConfigPanel
          onClose={() => setIsConfigOpen(false)}
          funnelData={funnelData}
          setFunnelData={setFunnelData}
          setSelectedStage={setSelectedStage}
          colorConfig={colorConfig}
          setColorConfig={setColorConfig}
          className={cn(
            "absolute -bottom-2 -left-2 z-[100] origin-[25px_calc(100%-25px)] transition-transform duration-300 ease-in-out",
            isConfigOpen
              ? "pointer-events-auto visible scale-100"
              : "pointer-events-none scale-0",
          )}
        />
      </div>
    </div>
  );
};

export default InfoPanel;
