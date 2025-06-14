import type { createTranslator, Messages } from 'next-intl';

export type SearchParams = { [key: string]: string | string[] | undefined };
export type TFunction<M extends Messages = Messages> = ReturnType<typeof createTranslator<M>>;
