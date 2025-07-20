"use client";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { funnelColorConfigs } from "./config";
import { aboutConfigs } from "@/components/funnel/configs";
import {
  FunnelColorConfig,
  FunnelStage,
} from "@/components/funnel/types-and-interfaces";
import { cn, shadowDepthPrimary } from "@/app/utils";
import { useRef } from "react";
import { useCloseOnOutsideClick } from "./hooks";

interface ConfigPanelProps {
  onClose: () => void;
  funnelData?: FunnelStage[];
  setFunnelData?: (data: FunnelStage[]) => void;
  setSelectedStage?: (stage: FunnelStage | undefined) => void;
  colorConfig?: FunnelColorConfig;
  setColorConfig?: (config: FunnelColorConfig) => void;
  className?: string;
}

const ConfigPanel = ({
  onClose,
  funnelData,
  setFunnelData,
  setSelectedStage,
  colorConfig,
  setColorConfig,
  className,
}: ConfigPanelProps) => {
  const configPopupClasses = cn(
    "bg-glass/90",
    "border-primary/20 border-2",
    "backdrop-blur-[10px]",
    shadowDepthPrimary,
    "backdrop-blur-3xl",
  );

  const ConfigPanelRef = useRef<HTMLDivElement | null>(null);

  useCloseOnOutsideClick(ConfigPanelRef, onClose);
  return (
    <div ref={ConfigPanelRef} className={cn(configPopupClasses, className)}>
      <IoIosCloseCircleOutline
        onClick={onClose}
        className="text-primary absolute right-1 bottom-1 h-10 w-10 cursor-pointer sm:right-auto sm:left-1"
      />

      <div className="flex flex-col gap-6 pt-2">
        <div>
          <p className="text-primary text-lg font-semibold">
            Choose a config{" "}
            <span className="text-secondary text-sm">
              (To see how the funnel structure changes):
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {aboutConfigs.map((config) => (
              <button
                key={config.title}
                onClick={() => {
                  setFunnelData?.(config.data);
                  setSelectedStage?.(config.data?.[2] ?? config.data?.[0]);
                }}
                className={cn(
                  "cursor-pointer rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all",
                  config.data === funnelData
                    ? "bg-primary border-primary text-white shadow-md"
                    : "border-primary/20 text-primary hover:bg-accent-2/70 hover:backdrop-blur-[2px]",
                )}
              >
                {config.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-primary text-lg font-semibold">
            Choose a color scheme{" "}
            <span className="text-secondary text-sm">
              (To change gradient colors):
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {funnelColorConfigs.map(({ title, config }) => (
              <button
                key={title}
                onClick={() => setColorConfig?.(config)}
                className={cn(
                  "cursor-pointer rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all",
                  config.gradientStart === colorConfig?.gradientStart &&
                    config.gradientEnd === colorConfig?.gradientEnd
                    ? "bg-primary border-primary text-white shadow-md"
                    : "border-primary/20 text-primary hover:bg-accent-2/70 hover:backdrop-blur-[2px]",
                )}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
