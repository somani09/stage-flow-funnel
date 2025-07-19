import { FunnelColorConfig } from "@/components/funnel/types-and-interfaces";

export const pageConfig = {
  title: "Funnel Visualization",
  description:
    "A responsive, SVG-based funnel chart with dynamic Bézier shapes, double normalization, gradient interpolation, and ResizeObserver-powered layout — fully interactive and built with TypeScript for precision and reusability.",
  funnelInfoSections: [
    {
      title: "Why We Built This",
      description:
        "Traditional funnel charts often break under extreme data skew. When the first stage holds a value much larger than the rest, the funnel narrows into a pipe—making later stages visually meaningless. No existing library offered a flexible, skew-resistant solution with full control over rendering.",
    },
    {
      title: "Our Approach",
      description:
        "We solved this by designing a fully custom SVG funnel system powered by a double normalization technique. The layout adjusts based on container size using ResizeObserver, and each stage’s width is carefully scaled to retain visual proportionality without exaggerating outliers.",
    },
    {
      title: "What’s Inside",
      description:
        "The funnel uses Bézier-curved paths for smooth visual flow, RGBA gradient overlays for stage differentiation, and a modular utility pipeline written in TypeScript. Every stage is clickable, interactive, and designed with reusability and clarity in mind—no third-party chart libraries involved.",
    },
  ],
};

export const funnelColorConfigs: {
  title: string;
  config: FunnelColorConfig;
}[] = [
  {
    title: "Pastel (Default)",
    config: {
      gradientStart: "#C9DEF4",
      gradientEnd: "#F5CCD4",
      selectedGradientStart: "#C1CDF9",
      selectedGradientEnd: "#B188EF",
      startAlpha: 100,
      endAlpha: 100,
      selectedStartAlpha: 100,
      selectedEndAlpha: 100,
    },
  },
  {
    title: "Peachy Blush",
    config: {
      gradientStart: "#FFD6DC",
      gradientEnd: "#FFC6CC",
      selectedGradientStart: "#FFABB5",
      selectedGradientEnd: "#F28A95",
      startAlpha: 100,
      endAlpha: 100,
      selectedStartAlpha: 100,
      selectedEndAlpha: 100,
    },
  },
  {
    title: "Misty Sky",
    config: {
      gradientStart: "#CCE4F6",
      gradientEnd: "#B0D4EF",
      selectedGradientStart: "#8FC1EA",
      selectedGradientEnd: "#6BAAE0",
      startAlpha: 100,
      endAlpha: 100,
      selectedStartAlpha: 100,
      selectedEndAlpha: 100,
    },
  },
];
