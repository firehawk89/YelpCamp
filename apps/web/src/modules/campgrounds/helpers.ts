import { Currency } from '@/types/misc';
import { SelectOption } from '@repo/ui/select';

export const CURRENCY_OPTIONS: SelectOption[] = [
  { value: Currency.USD, label: 'USD ($)' },
  { value: Currency.EUR, label: 'EUR (€)' },
  { value: Currency.GBP, label: 'GBP (£)' },
];
