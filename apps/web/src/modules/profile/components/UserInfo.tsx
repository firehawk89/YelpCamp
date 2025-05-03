import { routes } from '@/app/routes';
import { User } from '@/types/user';
import { formatDate } from '@/utils/date';
import { buttonVariants } from '@repo/ui/button';
import Card from '@repo/ui/card';
import Link from 'next/link';

import UserAvatar from './UserAvatar';

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const showUserName = user.firstName || user.lastName;

  return (
    <Card component="aside" className="flex h-fit shrink-0 basis-1/4 flex-col gap-5">
      <UserAvatar user={user} />

      <div className="flex flex-col gap-1">
        {showUserName && (
          <p className="text-center text-lg font-medium">
            {user.firstName} {user.lastName}
          </p>
        )}

        <p className="text-center text-sm text-neutral-500">Joined on {formatDate(new Date(user.createdAt))}</p>
      </div>

      <Link href={routes.campgrounds.new()} className={buttonVariants({ variant: 'success' })}>
        Create Campground
      </Link>
    </Card>
  );
};

export default UserInfo;
