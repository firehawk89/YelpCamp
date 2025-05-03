import { cn } from '@/utils/misc';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

import Card from '../Card';
import { ChevronIcon } from '../icons';
import { SelectButtonProps, SelectOptionProps, DropdownPosition, dropdownPositionClasses } from './helpers';

export type SelectOption<T = string> = {
  label: string;
  value?: T;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
};

export interface SelectProps<T, M extends SelectOption<T>> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: M[];
  selectedOption?: M;
  onChange?: (option: M) => void;
  renderButton?: (props: SelectButtonProps<M>) => ReactNode;
  renderOption?: (props: SelectOptionProps<M>) => ReactNode;
  position?: DropdownPosition;
  selectedOptionClassName?: string;
  listClassName?: string;
}

const Select = <T, M extends SelectOption<T>>({
  options,
  selectedOption,
  className,
  onChange,
  renderButton,
  renderOption,
  position = 'left',
  selectedOptionClassName,
  listClassName,
  ...props
}: SelectProps<T, M>) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option: M) => {
    setShowOptions(false);
    onChange?.(option);
    option.onClick?.();
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
      {renderButton ? (
        renderButton({
          selectedOption,
          isOpen: showOptions,
          toggleDropdown: () => setShowOptions((prev) => !prev),
        })
      ) : (
        <div
          className={'flex w-fit cursor-pointer items-center justify-between gap-1'}
          onClick={() => setShowOptions(!showOptions)}
        >
          <span className={cn('font-semibold', selectedOptionClassName)}>{selectedOption?.label}</span>
          <ChevronIcon className={cn('size-5 rotate-90 transition-transform', { '-rotate-90': showOptions })} />
        </div>
      )}

      <Card
        className={cn(
          'absolute top-full z-10 mt-1.5 w-36 flex-col py-2 transition-opacity',
          dropdownPositionClasses[position],
          !showOptions && 'pointer-events-none opacity-0',
          listClassName
        )}
        size="compact"
      >
        {options.map((option) => {
          const isSelected = option.value === selectedOption?.value;

          return renderOption ? (
            renderOption({ option, isSelected, closeDropdown: () => handleOptionClick(option) })
          ) : (
            <span
              key={option.label}
              className={cn(
                'flex cursor-pointer items-center gap-1 whitespace-nowrap px-3 py-1 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black',
                isSelected && 'pointer-events-none bg-neutral-100 text-black',
                option.className
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option.icon} {option.label}
            </span>
          );
        })}
      </Card>
    </div>
  );
};

export default Select;
