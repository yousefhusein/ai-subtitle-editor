import { FormatSupport, SubtitleFormat } from '../types/subtitle';

export const formatSupport: Record<SubtitleFormat, FormatSupport> = {
  srt: {
    format: 'srt',
    supports: {
      styling: false,
      positioning: false,
      colors: false,
      fonts: false,
      effects: false,
    },
    description: 'Basic subtitle format with minimal styling support. Only supports basic text and timing.',
  },
  ass: {
    format: 'ass',
    supports: {
      styling: true,
      positioning: true,
      colors: true,
      fonts: true,
      effects: true,
    },
    description: 'Advanced SubStation Alpha format with full styling support. Supports colors, fonts, positioning, and effects.',
  },
  ssa: {
    format: 'ssa',
    supports: {
      styling: true,
      positioning: true,
      colors: true,
      fonts: true,
      effects: true,
    },
    description: 'SubStation Alpha format with full styling support. Similar to ASS but with some limitations.',
  },
};

export const isFeatureSupported = (format: SubtitleFormat, feature: keyof FormatSupport['supports']): boolean => {
  return formatSupport[format].supports[feature];
};

export const getFormatDescription = (format: SubtitleFormat): string => {
  return formatSupport[format].description;
};

export const getSupportedFormats = (feature: keyof FormatSupport['supports']): SubtitleFormat[] => {
  return Object.entries(formatSupport)
    .filter(([_, support]) => support.supports[feature])
    .map(([format]) => format as SubtitleFormat);
}; 