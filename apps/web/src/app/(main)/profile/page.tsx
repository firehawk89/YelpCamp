import { routes } from '@/app/routes';
import UserInfo from '@/modules/profile/components/UserInfo';
import { getSessionUser } from '@/server/session';
import Card from '@repo/ui/card';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const user = await getSessionUser();

  if (!user) {
    return redirect(routes.signIn());
  }

  return (
    <div className="flex gap-5">
      <UserInfo user={user} />

      <Card className="w-full">Hey there</Card>
    </div>
  );
}
