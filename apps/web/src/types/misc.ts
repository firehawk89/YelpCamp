import type { createTranslator, Messages } from 'next-intl';

export type SearchParams = { [key: string]: string | string[] | undefined };
export type TFunction = ReturnType<typeof createTranslator<Messages>>;
