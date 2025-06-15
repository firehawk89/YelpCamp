import PersonalInfoForm from '@/modules/profile/components/PersonalInfoForm';
import { getSessionUser } from '@/server/session';
import { getTranslations } from 'next-intl/server';

export default async function Profile() {
  const t = await getTranslations('pages.profile.personalInfo');
  const user = await getSessionUser();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{t('title')}</h2>
      <PersonalInfoForm user={user} />
    </div>
  );
}
