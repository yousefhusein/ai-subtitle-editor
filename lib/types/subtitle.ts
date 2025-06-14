export interface SubtitleStyle {
  alignment?: 'left' | 'center' | 'right';
  fontSize?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  position?: {
    x: number;
    y: number;
  };
}

export interface SubtitleEntry {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
  style?: SubtitleStyle;
}

export type SubtitleFormat = 'srt' | 'ass' | 'ssa';

export interface SubtitleFile {
  format: SubtitleFormat;
  entries: SubtitleEntry[];
  metadata?: {
    title?: string;
    author?: string;
    scriptType?: string;
    wrapStyle?: string;
    scaledBorderAndShadow?: string;
    yCbCrMatrix?: string;
    playResX?: number;
    playResY?: number;
    timer?: string;
  };
}

export interface FormatSupport {
  format: SubtitleFormat;
  supports: {
    styling: boolean;
    positioning: boolean;
    colors: boolean;
    fonts: boolean;
    effects: boolean;
  };
  description: string;
} 