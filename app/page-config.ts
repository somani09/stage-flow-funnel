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
