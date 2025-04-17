import { routes } from '@/app/routes';
import '@repo/tailwind-config/styles';
import ProfileTabs from '@/modules/profile/components/ProfileTabs';
import UserInfo from '@/modules/profile/components/UserInfo';
import { getSessionUser } from '@/server/session';
import Card from '@repo/ui/card';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface ProfileLayoutProps {
  children: ReactNode;
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const user = await getSessionUser();

  if (!user) {
    return redirect(routes.signIn());
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <UserInfo user={user} />

      <Card className="w-full gap-6 overflow-hidden" orientation="vertical">
        <ProfileTabs />
        {children}
      </Card>
    </div>
  );
}
