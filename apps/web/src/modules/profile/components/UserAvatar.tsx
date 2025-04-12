'use client';

import { User } from '@/types/user';
import Avatar from '@repo/ui/avatar';
import Button from '@repo/ui/button';
import { EditIcon } from '@repo/ui/icons';
import { HTMLAttributes, useState } from 'react';

import AvatarModal from './AvatarModal';

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  user: User;
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  return (
    <>
      <div className="relative mx-auto size-32" {...props}>
        <Avatar className="size-full" src={user.avatar ?? ''} />

        <Button
          className="absolute -bottom-2.5 left-1/2 size-7 -translate-x-1/2 rounded-full"
          onClick={() => setIsAvatarModalOpen(true)}
          variant="accent"
          icon={<EditIcon className="size-[80%]" />}
        />
      </div>

      <AvatarModal user={user} isOpen={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} />
    </>
  );
};

export default UserAvatar;
