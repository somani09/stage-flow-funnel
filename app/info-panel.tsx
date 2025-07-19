import { aboutConfigs } from "@/components/funnel/configs";
import { FunnelStage } from "@/components/funnel/types-and-interfaces";
import { cn } from "./utils";
import { pageConfig } from "./page-config";
import { useMediaQuery } from "./hooks";

interface Props {
  funnelHeight: number | null;
  scrollHeight: string;
  funnelData: FunnelStage[];
  setFunnelData: (data: FunnelStage[]) => void;
  setSelectedStage: (stage: FunnelStage | undefined) => void;
  className?: string;
}

const InfoPanel = ({
  funnelHeight,
  scrollHeight,
  funnelData,
  setFunnelData,
  setSelectedStage,
  className,
}: Props) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <div
      className={cn(
        "border-primary/10 bg-glass/20 relative flex flex-col gap-6 rounded-xl border p-6",
        "shadow-[0_2px_6px_rgba(1,42,74,0.15),_0_6px_12px_rgba(1,42,74,0.2),_0_12px_24px_rgba(1,42,74,0.25),_0_20px_32px_rgba(1,42,74,0.2),_0_32px_48px_rgba(1,42,74,0.15)]",
        "text-primary flex flex-1 backdrop-blur-[6px]",
        className,
      )}
      style={{
        maxHeight: isLargeScreen && funnelHeight ? `${funnelHeight}px` : "none",
        height: "max-content",
        overflow: "hidden",
      }}
    >
      <h2 className="text-3xl font-semibold">Implementation Notes</h2>

      {/* Scrollable only this section */}
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
        {/* GitHub Link */}
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

      {/* Config Switcher */}
      <div className="flex flex-col gap-3">
        <p className="text-secondary text-lg font-semibold">
          Choose a config{" "}
          <span className="text-primary text-sm">
            (To see how the funnel changes)
          </span>
          :
        </p>
        <div className="flex flex-wrap gap-4">
          {aboutConfigs.map((config) => (
            <button
              key={config.title}
              onClick={() => {
                setFunnelData(config.data);
                setSelectedStage(config.data?.[2] ?? config.data?.[0]);
              }}
              className={cn(
                "cursor-pointer rounded-lg border px-5 py-2 text-sm font-semibold transition-all",
                config.data === funnelData
                  ? "bg-primary border-primary text-white shadow-md"
                  : "border-primary/20 text-primary hover:bg-glass/30 hover:backdrop-blur-[2px]",
              )}
            >
              {config.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
