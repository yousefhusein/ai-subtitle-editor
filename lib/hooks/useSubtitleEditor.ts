import { useState, useCallback } from 'react';
import { SubtitleEntry, SubtitleFormat, SubtitleFile } from '../types/subtitle';
import { isFeatureSupported } from '../utils/subtitle-formats';
import { parseSRT, parseASS, parseSSA, formatSRT, formatASS, formatSSA, convertFormat } from '../utils/subtitle-parser';

type FeatureType = 'styling' | 'positioning' | 'colors' | 'fonts' | 'effects';

interface UseSubtitleEditorProps {
  initialFormat?: SubtitleFormat;
}

export const useSubtitleEditor = ({ initialFormat = 'srt' }: UseSubtitleEditorProps = {}) => {
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>([]);
  const [format, setFormat] = useState<SubtitleFormat>(initialFormat);
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      let entries: SubtitleEntry[] = [];

      switch (file.name.split('.').pop()?.toLowerCase()) {
        case 'srt':
          entries = parseSRT(content);
          break;
        case 'ass':
          entries = parseASS(content).entries;
          break;
        case 'ssa':
          entries = parseSSA(content).entries;
          break;
        default:
          throw new Error('Unsupported file format');
      }

      setSubtitles(entries);
    };
    reader.readAsText(file);
  }, []);

  const handleDownload = useCallback((targetFormat: SubtitleFormat = format) => {
    const convertedEntries = convertFormat(subtitles, format, targetFormat);
    let content: string;

    switch (targetFormat) {
      case 'srt':
        content = formatSRT(convertedEntries);
        break;
      case 'ass':
        content = formatASS({ format: 'ass', entries: convertedEntries });
        break;
      case 'ssa':
        content = formatSSA({ format: 'ssa', entries: convertedEntries });
        break;
      default:
        throw new Error('Unsupported format');
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subtitles.${targetFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [subtitles, format]);

  const addSubtitle = useCallback(() => {
    const newId = subtitles.length > 0 ? Math.max(...subtitles.map(s => s.id)) + 1 : 1;
    setSubtitles([...subtitles, {
      id: newId,
      startTime: '00:00:00,000',
      endTime: '00:00:03,000',
      text: '',
    }]);
  }, [subtitles]);

  const updateSubtitle = useCallback((id: number, field: keyof SubtitleEntry, value: any) => {
    setSubtitles(subtitles.map(sub => 
      sub.id === id ? { ...sub, [field]: value } : sub
    ));
  }, [subtitles]);

  const deleteSubtitle = useCallback((id: number) => {
    setSubtitles(subtitles.filter(sub => sub.id !== id));
    if (selectedEntry === id) {
      setSelectedEntry(null);
    }
  }, [subtitles, selectedEntry]);

  const isFeatureEnabled = useCallback((feature: FeatureType) => {
    return isFeatureSupported(format, feature);
  }, [format]);

  return {
    subtitles,
    format,
    setFormat,
    selectedEntry,
    setSelectedEntry,
    handleFileUpload,
    handleDownload,
    addSubtitle,
    updateSubtitle,
    deleteSubtitle,
    isFeatureEnabled,
  };
}; 