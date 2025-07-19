export interface SvgWidths {
  topWidth: number;
  bottomWidth: number;
}

export interface SvgData {
  id: number | string;
  topWidth: number;
  bottomWidth: number;
  gradientStart: string;
  gradientEnd: string;
}

export interface FunnelStage {
  stageId: number;
  stageConversionName: string;
  value: number;
}

export interface FunnelColorConfig {
  gradientStart: string;
  gradientEnd: string;
  selectedGradientStart?: string;
  selectedGradientEnd?: string;
  startAlpha?: string | number;
  endAlpha?: string | number;
  selectedStartAlpha?: string | number;
  selectedEndAlpha?: string | number;
}
