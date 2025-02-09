'use client';

import { cn } from '@/utils/misc';
import Select, { SelectOption } from '@repo/ui/select';
import { FC, HTMLAttributes } from 'react';

interface SortControlsProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  options: SelectOption[];
  selectedOption: string;
  handleSort: (sortOption: SelectOption) => void;
}

const SortControls: FC<SortControlsProps> = ({ label, options, selectedOption, className, handleSort, ...props }) => (
  <div className={cn('flex items-center gap-2.5', className)} {...props}>
    <span>{label}</span>
    <Select options={options} selectedOption={selectedOption} onChange={handleSort} />
  </div>
);

export default SortControls;
