import { LATITUDE_RANGE, LONGITUDE_RANGE, MIN_CAMPGROUND_LOCATION_LENGTH } from '@/utils/constants/validation';
import { z } from 'zod';

export const locationSchema = z.object(
  {
    full_address: z.string({ message: 'Location address is required' }).min(MIN_CAMPGROUND_LOCATION_LENGTH, {
      message: `Location must be at least ${MIN_CAMPGROUND_LOCATION_LENGTH} characters long`,
    }),
    coordinates: z.object({
      latitude: z
        .number({ message: 'Latitude is required' })
        .min(LATITUDE_RANGE.MIN, {
          message: `Latitude must be between -${LATITUDE_RANGE.MIN} and ${LATITUDE_RANGE.MAX}`,
        })
        .max(LATITUDE_RANGE.MAX, {
          message: `Latitude must be between -${LATITUDE_RANGE.MIN} and ${LATITUDE_RANGE.MAX}`,
        })
        .refine((val) => val !== 0, { message: 'Latitude must be a valid non-zero number' }),
      longitude: z
        .number({ message: 'Longitude is required' })
        .min(LONGITUDE_RANGE.MIN, {
          message: `Latitude must be between -${LONGITUDE_RANGE.MIN} and ${LONGITUDE_RANGE.MAX}`,
        })
        .max(LONGITUDE_RANGE.MAX, {
          message: `Latitude must be between -${LONGITUDE_RANGE.MIN} and ${LONGITUDE_RANGE.MAX}`,
        })
        .refine((val) => val !== 0, { message: 'Longitude must be a valid non-zero number' }),
    }),
  },
  { message: 'Location is required' }
);
