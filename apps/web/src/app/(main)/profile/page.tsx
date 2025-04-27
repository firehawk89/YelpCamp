import PersonalInfoForm from '@/modules/profile/components/PersonalInfoForm';
import { getSessionUser } from '@/server/session';

export default async function Profile() {
  const user = await getSessionUser();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <PersonalInfoForm user={user} />
    </div>
  );
}
