'use client';

import Overlay from '@/components/shared/Overlay';
import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import Divider from '@repo/ui/divider';
import { CloseIcon, MenuIcon } from '@repo/ui/icons';
import { HTMLAttributes, useState } from 'react';
import { User } from 'types/user';

import HeaderAuthMenu from './HeaderAuthMenu';
import HeaderMenu from './HeaderMenu';

interface MobileMenuProps extends HTMLAttributes<HTMLDivElement> {
  user: User | null;
  overlayClassName?: string;
}

const MobileMenu = ({ user, overlayClassName, className, ...props }: MobileMenuProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <>
      <Button className="lg:hidden" size="icon" icon={<MenuIcon />} onClick={() => setIsMenuOpened(true)} />

      <Overlay
        className={cn('lg:hidden', overlayClassName)}
        isHidden={!isMenuOpened}
        content="right"
        onClick={() => setIsMenuOpened(false)}
      >
        <div
          className={cn(
            'h-full w-72 translate-x-72 bg-white px-5 py-3 transition-all',
            {
              '-translate-x-0 opacity-100': isMenuOpened,
              'translate-x-72': !isMenuOpened,
            },
            className
          )}
          {...props}
        >
          <Button
            className="ml-auto"
            size="icon"
            icon={<CloseIcon className="size-7" />}
            onClick={() => setIsMenuOpened(false)}
          />

          <div className="mt-3 flex flex-col gap-5">
            <HeaderMenu orientation="vertical" />
            <Divider />
            <HeaderAuthMenu orientation="vertical" user={user} onLogout={() => setIsMenuOpened(false)} />
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default MobileMenu;
