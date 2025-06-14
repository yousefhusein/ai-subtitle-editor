import { SubtitleEntry, SubtitleFile, SubtitleFormat } from '../types/subtitle';

const timeToMilliseconds = (time: string): number => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

const millisecondsToTime = (ms: number): string => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds.toString().padStart(3, '0')}`;
};

export const parseSRT = (content: string): SubtitleEntry[] => {
  const entries: SubtitleEntry[] = [];
  const blocks = content.trim().split(/\n\s*\n/);

  blocks.forEach((block) => {
    const lines = block.split('\n');
    if (lines.length >= 3) {
      const id = parseInt(lines[0]);
      const [startTime, endTime] = lines[1].split(' --> ');
      const text = lines.slice(2).join('\n');

      entries.push({
        id,
        startTime,
        endTime,
        text,
      });
    }
  });

  return entries;
};

export const parseASS = (content: string): SubtitleFile => {
  const lines = content.split('\n');
  const metadata: Record<string, string> = {};
  const entries: SubtitleEntry[] = [];
  let inEvents = false;
  let format: string[] = [];

  lines.forEach((line) => {
    if (line.startsWith('[') && line.endsWith(']')) {
      inEvents = line === '[Events]';
      return;
    }

    if (line.startsWith('Format:')) {
      format = line.replace('Format:', '').split(',').map(f => f.trim());
      return;
    }

    if (inEvents && line.startsWith('Dialogue:')) {
      const values = line.replace('Dialogue:', '').split(',').map(v => v.trim());
      const entry: any = {};
      format.forEach((key, index) => {
        entry[key] = values[index];
      });

      entries.push({
        id: entries.length + 1,
        startTime: entry.Start,
        endTime: entry.End,
        text: entry.Text,
        style: {
          alignment: entry.Alignment,
          fontSize: parseInt(entry.FontSize),
          color: entry.PrimaryColour,
          bold: entry.Bold === '1',
          italic: entry.Italic === '1',
          underline: entry.Underline === '1',
          position: {
            x: parseInt(entry.MarginL),
            y: parseInt(entry.MarginV),
          },
        },
      });
    } else if (!inEvents && line.includes(':')) {
      const [key, value] = line.split(':').map(s => s.trim());
      metadata[key] = value;
    }
  });

  return {
    format: 'ass',
    entries,
    metadata: {
      title: metadata.Title,
      author: metadata.ScriptType,
      scriptType: metadata.ScriptType,
      wrapStyle: metadata.WrapStyle,
      scaledBorderAndShadow: metadata.ScaledBorderAndShadow,
      yCbCrMatrix: metadata.YCbCrMatrix,
      playResX: parseInt(metadata.PlayResX),
      playResY: parseInt(metadata.PlayResY),
      timer: metadata.Timer,
    },
  };
};

export const parseSSA = (content: string): SubtitleFile => {
  // SSA format is very similar to ASS, we can reuse the ASS parser
  return parseASS(content);
};

export const formatSRT = (entries: SubtitleEntry[]): string => {
  return entries
    .map(
      (entry) =>
        `${entry.id}\n${entry.startTime} --> ${entry.endTime}\n${entry.text}\n`
    )
    .join('\n');
};

export const formatASS = (file: SubtitleFile): string => {
  const { entries, metadata } = file;
  let content = '[Script Info]\n';
  
  if (metadata) {
    Object.entries(metadata).forEach(([key, value]) => {
      if (value !== undefined) {
        content += `${key}: ${value}\n`;
      }
    });
  }

  content += '\n[Events]\n';
  content += 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n';

  entries.forEach((entry) => {
    const style = entry.style || {};
    content += `Dialogue: 0,${entry.startTime},${entry.endTime},Default,,0,0,0,,${entry.text}\n`;
  });

  return content;
};

export const formatSSA = (file: SubtitleFile): string => {
  // SSA format is very similar to ASS, we can reuse the ASS formatter
  return formatASS(file);
};

export const convertFormat = (
  entries: SubtitleEntry[],
  fromFormat: SubtitleFormat,
  toFormat: SubtitleFormat
): SubtitleEntry[] => {
  // When converting to SRT, we need to strip all styling
  if (toFormat === 'srt') {
    return entries.map(({ id, startTime, endTime, text }) => ({
      id,
      startTime,
      endTime,
      text,
    }));
  }

  // When converting from SRT to ASS/SSA, we can keep the entries as is
  // since ASS/SSA support all SRT features
  return entries;
}; 