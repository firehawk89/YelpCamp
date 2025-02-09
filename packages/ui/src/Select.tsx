import { cn } from '@/utils/misc';
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

import Card from './Card';
import { ChevronIcon } from './icons';

export type SelectOption<T = string> = { value: T; label: string };

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SelectOption[];
  selectedOption: string | SelectOption;
  onChange: (option: SelectOption) => void;
}

const Select: FC<SelectProps> = ({ options, selectedOption, className, onChange, ...props }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  const selectedOptionValue = typeof selectedOption === 'string' ? selectedOption : selectedOption?.value;
  const selectedOptionLabel = options.find((option) => option.value === selectedOptionValue)?.label;

  const selectOption = (option: SelectOption) => {
    setShowOptions(false);

    if (selectedOptionValue !== option.value) {
      onChange(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={cn('relative', className)} {...props}>
      <div
        className="flex w-fit cursor-pointer items-center justify-between gap-1"
        onClick={() => setShowOptions(!showOptions)}
      >
        <span className="text-accent font-bold">{selectedOptionLabel}</span>
        <ChevronIcon className={cn('size-5 rotate-90 transition-transform', { '-rotate-90': showOptions })} />
      </div>

      <Card
        className={cn(
          'absolute left-0 top-full z-10 mt-1.5 w-36 flex-col py-2 transition-opacity',
          !showOptions && 'pointer-events-none opacity-0'
        )}
        size="compact"
      >
        {options.map((option) => {
          const isSelected = selectedOptionValue === option.value;

          return (
            <span
              key={option.value}
              className={cn(
                'cursor-pointer px-3 py-1 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black',
                isSelected && 'pointer-events-none bg-neutral-100 text-black'
              )}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </span>
          );
        })}
      </Card>
    </div>
  );
};

export default Select;
