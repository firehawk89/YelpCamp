import AppError, { ErrorType } from '@/components/AppError';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('pages.notFound');

  return <AppError code={ErrorType.NotFound} title={t('title')} message={t('message')} />;
}
