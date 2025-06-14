'use client';

import {
  Card,
  CardBody,
  Button,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  ScrollShadow,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Chip,
} from '@nextui-org/react';
import {
  IconUpload,
  IconDownload,
  IconPlus,
  IconTrash,
  IconTextSize,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconChevronDown,
  IconPalette,
  IconBold,
  IconItalic,
  IconUnderline,
  IconInfoCircle,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import TimeInput from './TimeInput';
import { useSubtitleEditor } from '@/lib/hooks/useSubtitleEditor';
import { getFormatDescription } from '@/lib/utils/subtitle-formats';

export default function SubtitleEditor() {
  const {
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
  } = useSubtitleEditor();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
            startContent={<IconUpload size={20} />}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Upload File
          </Button>
          <input
            id="file-upload"
            type="file"
            accept=".srt,.ass,.ssa"
            className="hidden"
            onChange={handleFileChange}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                endContent={<IconChevronDown size={20} />}
                className="border-zinc-700 text-white hover:border-zinc-600"
              >
                {format.toUpperCase()}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="File type selection"
              onAction={(key) => setFormat(key as typeof format)}
              className="bg-zinc-900 border border-zinc-800"
            >
              <DropdownItem key="srt" className="text-white">
                <div className="flex flex-col gap-1">
                  <span>SRT</span>
                  <span className="text-xs text-zinc-400">{getFormatDescription('srt')}</span>
                </div>
              </DropdownItem>
              <DropdownItem key="ass" className="text-white">
                <div className="flex flex-col gap-1">
                  <span>ASS</span>
                  <span className="text-xs text-zinc-400">{getFormatDescription('ass')}</span>
                </div>
              </DropdownItem>
              <DropdownItem key="ssa" className="text-white">
                <div className="flex flex-col gap-1">
                  <span>SSA</span>
                  <span className="text-xs text-zinc-400">{getFormatDescription('ssa')}</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20"
            startContent={<IconDownload size={20} />}
            onClick={() => handleDownload()}
          >
            Download as {format.toUpperCase()}
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                endContent={<IconChevronDown size={20} />}
                className="border-zinc-700 text-white hover:border-zinc-600"
              >
                Export as
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Export format selection"
              onAction={(key) => handleDownload(key as typeof format)}
              className="bg-zinc-900 border border-zinc-800"
            >
              <DropdownItem key="srt" className="text-white">SRT</DropdownItem>
              <DropdownItem key="ass" className="text-white">ASS</DropdownItem>
              <DropdownItem key="ssa" className="text-white">SSA</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <ScrollShadow className="max-h-[calc(100vh-200px)]">
        <div className="space-y-4">
          <AnimatePresence>
            {subtitles.map((subtitle) => (
              <motion.div
                key={subtitle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={`bg-zinc-900/50 backdrop-blur-xl border ${
                    selectedEntry === subtitle.id ? 'border-blue-500' : 'border-zinc-800'
                  } hover:border-zinc-700 transition-colors`}
                  onClick={() => setSelectedEntry(subtitle.id)}
                >
                  <CardBody className="p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <TimeInput
                            label="Start Time"
                            value={subtitle.startTime}
                            onChange={(value) => updateSubtitle(subtitle.id, 'startTime', value)}
                          />
                        </div>
                        <div className="flex-1">
                          <TimeInput
                            label="End Time"
                            value={subtitle.endTime}
                            onChange={(value) => updateSubtitle(subtitle.id, 'endTime', value)}
                          />
                        </div>
                        <div className="flex items-center">
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            className="text-red-400 hover:text-red-300"
                            onClick={() => deleteSubtitle(subtitle.id)}
                          >
                            <IconTrash size={20} />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        label="Subtitle Text"
                        value={subtitle.text}
                        onChange={(e) => updateSubtitle(subtitle.id, 'text', e.target.value)}
                        classNames={{
                          input: "text-white",
                          inputWrapper: "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 focus-within:border-blue-500",
                          label: "text-zinc-400",
                        }}
                      />
                      {isFeatureEnabled('styling') && (
                        <div className="flex flex-wrap gap-2">
                          <div className="flex gap-2">
                            <Tooltip content="Bold">
                              <Button
                                isIconOnly
                                variant="light"
                                className={`text-zinc-400 hover:text-white ${
                                  subtitle.style?.bold ? 'text-blue-400' : ''
                                }`}
                                onClick={() => updateSubtitle(subtitle.id, 'style', {
                                  ...subtitle.style,
                                  bold: !subtitle.style?.bold,
                                })}
                              >
                                <IconBold size={20} />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Italic">
                              <Button
                                isIconOnly
                                variant="light"
                                className={`text-zinc-400 hover:text-white ${
                                  subtitle.style?.italic ? 'text-blue-400' : ''
                                }`}
                                onClick={() => updateSubtitle(subtitle.id, 'style', {
                                  ...subtitle.style,
                                  italic: !subtitle.style?.italic,
                                })}
                              >
                                <IconItalic size={20} />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Underline">
                              <Button
                                isIconOnly
                                variant="light"
                                className={`text-zinc-400 hover:text-white ${
                                  subtitle.style?.underline ? 'text-blue-400' : ''
                                }`}
                                onClick={() => updateSubtitle(subtitle.id, 'style', {
                                  ...subtitle.style,
                                  underline: !subtitle.style?.underline,
                                })}
                              >
                                <IconUnderline size={20} />
                              </Button>
                            </Tooltip>
                          </div>
                          {isFeatureEnabled('fonts') && (
                            <Popover placement="bottom">
                              <PopoverTrigger>
                                <Button
                                  isIconOnly
                                  variant="light"
                                  className="text-zinc-400 hover:text-white"
                                >
                                  <IconTextSize size={20} />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="bg-zinc-900 border border-zinc-800">
                                <div className="p-4">
                                  <h4 className="text-white mb-2">Font Size</h4>
                                  <div className="flex gap-2">
                                    {[12, 14, 16, 18, 20].map((size) => (
                                      <Button
                                        key={size}
                                        size="sm"
                                        variant="flat"
                                        className={`bg-zinc-800 text-white ${
                                          subtitle.style?.fontSize === size ? 'bg-blue-500' : ''
                                        }`}
                                        onClick={() => updateSubtitle(subtitle.id, 'style', {
                                          ...subtitle.style,
                                          fontSize: size,
                                        })}
                                      >
                                        {size}px
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                          {isFeatureEnabled('colors') && (
                            <Popover placement="bottom">
                              <PopoverTrigger>
                                <Button
                                  isIconOnly
                                  variant="light"
                                  className="text-zinc-400 hover:text-white"
                                >
                                  <IconPalette size={20} />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="bg-zinc-900 border border-zinc-800">
                                <div className="p-4">
                                  <h4 className="text-white mb-2">Text Color</h4>
                                  <div className="grid grid-cols-4 gap-2">
                                    {['#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map((color) => (
                                      <Button
                                        key={color}
                                        size="sm"
                                        variant="flat"
                                        className={`w-8 h-8 ${
                                          subtitle.style?.color === color ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => updateSubtitle(subtitle.id, 'style', {
                                          ...subtitle.style,
                                          color,
                                        })}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                          {isFeatureEnabled('positioning') && (
                            <div className="flex gap-2">
                              <Tooltip content="Align Left">
                                <Button
                                  isIconOnly
                                  variant="light"
                                  className={`text-zinc-400 hover:text-white ${
                                    subtitle.style?.alignment === 'left' ? 'text-blue-400' : ''
                                  }`}
                                  onClick={() => updateSubtitle(subtitle.id, 'style', {
                                    ...subtitle.style,
                                    alignment: 'left',
                                  })}
                                >
                                  <IconAlignLeft size={20} />
                                </Button>
                              </Tooltip>
                              <Tooltip content="Align Center">
                                <Button
                                  isIconOnly
                                  variant="light"
                                  className={`text-zinc-400 hover:text-white ${
                                    subtitle.style?.alignment === 'center' ? 'text-blue-400' : ''
                                  }`}
                                  onClick={() => updateSubtitle(subtitle.id, 'style', {
                                    ...subtitle.style,
                                    alignment: 'center',
                                  })}
                                >
                                  <IconAlignCenter size={20} />
                                </Button>
                              </Tooltip>
                              <Tooltip content="Align Right">
                                <Button
                                  isIconOnly
                                  variant="light"
                                  className={`text-zinc-400 hover:text-white ${
                                    subtitle.style?.alignment === 'right' ? 'text-blue-400' : ''
                                  }`}
                                  onClick={() => updateSubtitle(subtitle.id, 'style', {
                                    ...subtitle.style,
                                    alignment: 'right',
                                  })}
                                >
                                  <IconAlignRight size={20} />
                                </Button>
                              </Tooltip>
                            </div>
                          )}
                        </div>
                      )}
                      {!isFeatureEnabled('styling') && (
                        <Chip
                          color="warning"
                          variant="flat"
                          startContent={<IconInfoCircle size={16} />}
                          className="text-yellow-400"
                        >
                          Styling is not supported in {format.toUpperCase()} format
                        </Chip>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollShadow>

      <Button
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
        isIconOnly
        onClick={addSubtitle}
      >
        <IconPlus size={24} />
      </Button>
    </div>
  );
} 