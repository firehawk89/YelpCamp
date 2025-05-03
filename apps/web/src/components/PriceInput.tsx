'use client';

import { cn } from '@/utils/misc';
import Input, { InputProps } from '@repo/ui/input';
import Select, { SelectOption } from '@repo/ui/select';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface PriceInputProps<T extends FieldValues = FieldValues> extends Omit<InputProps, 'type'> {
  options: SelectOption[];
  selectedOption?: SelectOption;
  onOptionChange?: (option: SelectOption) => void;
  containerClassName?: string;
  register?: UseFormRegister<T>;
  valueField?: Path<T>;
  currencyField?: Path<T>;
}

const PriceInput = <T extends FieldValues>({
  containerClassName,
  options,
  selectedOption,
  onOptionChange,
  className,
  register,
  valueField,
  currencyField,
  ...props
}: PriceInputProps<T>) => (
  <div className={cn('relative', containerClassName)}>
    <Input
      className={cn('input-no-spinner pr-[100px]', className)}
      {...(register && valueField ? register(valueField) : {})}
      type="number"
      {...props}
    />
    <Select
      id="currency-select"
      {...(register && currencyField ? register(currencyField) : {})}
      className="absolute right-4 top-1/2 -translate-y-1/2"
      selectedOption={selectedOption}
      options={options}
      onChange={onOptionChange}
      listClassName="w-fit"
      selectedOptionClassName="text-sm"
      position="center"
    />
  </div>
);

export default PriceInput;
