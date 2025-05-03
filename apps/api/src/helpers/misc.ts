import { Logger } from '@nestjs/common';
import slugify from 'slugify';

export const generateSlug = (value: string): string => slugify(value, { lower: true });

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
