import { User } from '@/types/user';
import { formatDate } from '@/utils/date';
import Card from '@repo/ui/card';

import UserAvatar from './UserAvatar';

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Card component="aside" className="flex h-fit shrink-0 basis-1/4 flex-col gap-5">
      <UserAvatar user={user} />
      <p className="text-center text-sm text-neutral-500">Joined on {formatDate(new Date(user.createdAt))}</p>
    </Card>
  );
};

export default UserInfo;
