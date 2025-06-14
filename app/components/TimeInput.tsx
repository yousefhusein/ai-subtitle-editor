'use client';

import { useState, useCallback } from 'react';
import { Input, Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react';
import { IconClock } from '@tabler/icons-react';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function TimeInput({ value, onChange, label }: TimeInputProps) {
  const [hours, minutes, seconds, milliseconds] = value.split(/[:,]/).map(Number);
  const [isOpen, setIsOpen] = useState(false);

  const handleTimeChange = useCallback((type: 'hours' | 'minutes' | 'seconds' | 'milliseconds', newValue: number) => {
    let newHours = hours;
    let newMinutes = minutes;
    let newSeconds = seconds;
    let newMilliseconds = milliseconds;

    switch (type) {
      case 'hours':
        newHours = Math.max(0, Math.min(23, newValue));
        break;
      case 'minutes':
        newMinutes = Math.max(0, Math.min(59, newValue));
        break;
      case 'seconds':
        newSeconds = Math.max(0, Math.min(59, newValue));
        break;
      case 'milliseconds':
        newMilliseconds = Math.max(0, Math.min(999, newValue));
        break;
    }

    const newTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')},${String(newMilliseconds).padStart(3, '0')}`;
    onChange(newTime);
  }, [hours, minutes, seconds, milliseconds, onChange]);

  return (
    <Popover 
      isOpen={isOpen} 
      onOpenChange={setIsOpen}
      placement="bottom"
      showArrow
      backdrop="blur"
    >
      <PopoverTrigger>
        <Input
          type="text"
          label={label}
          value={value}
          readOnly
          startContent={<IconClock size={20} className="text-zinc-400" />}
          classNames={{
            input: "text-white",
            inputWrapper: "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 focus-within:border-blue-500",
            label: "text-zinc-400",
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="bg-zinc-900 border border-zinc-800">
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-4 gap-2">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Hours</label>
              <div className="flex flex-col gap-1">
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-white"
                  onClick={() => handleTimeChange('hours', hours + 1)}
                >
                  ▲
                </Button>
                <Input
                  type="number"
                  value={hours}
                  onChange={(e) => handleTimeChange('hours', parseInt(e.target.value) || 0)}
                  min={0}
                  max={23}
                  classNames={{
                    input: "text-white text-center",
                    inputWrapper: "bg-zinc-800/50 border-zinc-700",
                  }}
                />
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-white"
                  onClick={() => handleTimeChange('hours', hours - 1)}
                >
                  ▼
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Minutes</label>
              <div className="flex flex-col gap-1">
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-white"
                  onClick={() => handleTimeChange('minutes', minutes + 1)}
                >
                  ▲
                </Button>
                <Input
                  type="number"
                  value={minutes}
                  onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value) || 0)}
                  min={0}
                  max={59}
                  classNames={{
                    input: "text-white text-center",
                    inputWrapper: "bg-zinc-800/50 border-zinc-700",
                  }}
                />
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-white"
                  onClick={() => handleTimeChange('minutes', minutes - 1)}
                >
                  ▼
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Seconds</label>
              <div className="flex flex-col gap-1">
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-white"
                  onClick={() => handleTimeChange('seconds', seconds + 1)}
                >
                  ▲
                </Button>
                <Input
                  type="number"
                  value={seconds}
                  onChange={(e) => handleTimeChange('seconds', parseInt(e.target.value) || 0)}
                  min={0}
                  max={59}
                  classNames={{
                    input: "text-white text-center",
                    inputWrapper: "bg-zinc-800/50 border-zinc-700",
                  }}
                />
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-white"
                  onClick={() => handleTimeChange('seconds', seconds - 1)}
                >
                  ▼
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">MS</label>
              <div className="flex flex-col gap-1">
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-white"
                  onClick={() => handleTimeChange('milliseconds', milliseconds + 100)}
                >
                  ▲
                </Button>
                <Input
                  type="number"
                  value={milliseconds}
                  onChange={(e) => handleTimeChange('milliseconds', parseInt(e.target.value) || 0)}
                  min={0}
                  max={999}
                  classNames={{
                    input: "text-white text-center",
                    inputWrapper: "bg-zinc-800/50 border-zinc-700",
                  }}
                />
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-white"
                  onClick={() => handleTimeChange('milliseconds', milliseconds - 100)}
                >
                  ▼
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="flat"
              className="bg-zinc-800 text-white"
              onClick={() => setIsOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 