import slugify from 'slugify';

export const generateSlug = (value: string): string => slugify(value, { lower: true });
