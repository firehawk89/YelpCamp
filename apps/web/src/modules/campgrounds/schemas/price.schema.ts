import { Currency } from '@/types/misc';
import { MIN_CAMPGROUND_PRICE, MAX_CAMPGROUND_PRICE } from '@/utils/constants/validation';
import { z } from 'zod';

const allowedCurrencies = Object.keys(Currency).join(', ');

export const priceSchema = z.object({
  value: z.preprocess(
    (val) => {
      if (typeof val === 'string' && val.trim() !== '') {
        const num = Number(val);
        return isNaN(num) ? val : num;
      }
      return val;
    },
    z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a valid number',
      })
      .min(MIN_CAMPGROUND_PRICE, {
        message: 'Price cannot be negative',
      })
      .max(MAX_CAMPGROUND_PRICE, {
        message: `Price cannot exceed ${MAX_CAMPGROUND_PRICE}`,
      })
  ),
  currency: z
    .nativeEnum(Currency, {
      message: `Currency is invalid. Allowed currencies are: ${allowedCurrencies}`,
    })
    .default(Currency.USD),
});
