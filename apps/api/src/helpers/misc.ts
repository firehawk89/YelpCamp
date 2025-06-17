import { Logger } from '@nestjs/common';
import slugify from 'slugify';

export const generateSlug = (value: string): string => slugify(value, { lower: true });

export const isValidSlug = (slug: string): boolean => {
  if (!slug.length || typeof slug !== 'string') {
    return false;
  }
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
};

export const handleError = (error: unknown, context: string, throwError: boolean = true) => {
  if (error instanceof Error) {
    const logger = new Logger(context);
    logger.error(error.message, error.stack);
  }

  if (throwError) {
    throw error;
  }
};

export const sample = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
