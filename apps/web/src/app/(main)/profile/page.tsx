import { routes } from '@/app/routes';
import { getSessionUser } from '@/server/session';
import Avatar from '@repo/ui/avatar';
import Card from '@repo/ui/card';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const user = await getSessionUser();

  if (!user) {
    return redirect(routes.signIn());
  }

  return (
    <div className="flex gap-5">
      <Card component="aside">
        Welcome back, {user.email}
        <Avatar size="lg" />
      </Card>

      <div></div>
    </div>
  );
}
