'use client';

import Overlay from '@/components/Overlay';
import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import Divider from '@repo/ui/divider';
import { CloseIcon, MenuIcon } from '@repo/ui/icons';
import { HTMLAttributes, useState } from 'react';
import { useClickOutside } from 'src/hooks/useClickOutside';
import { User } from 'src/types/user';

import HeaderMenu from './HeaderMenu';
import { authMenuItems } from './helpers';
import UserMenu from './UserMenu';

interface MobileMenuProps extends HTMLAttributes<HTMLDivElement> {
  user: User | null;
  overlayClassName?: string;
}

const MobileMenu = ({ user, overlayClassName, className, ...props }: MobileMenuProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const mobileMenuRef = useClickOutside<HTMLDivElement>(() => setIsMenuOpened(false));

  return (
    <>
      <div className="flex items-center gap-4 lg:hidden">
        {user && <UserMenu />}
        <Button size="icon" icon={<MenuIcon />} onClick={() => setIsMenuOpened(true)} />
      </div>

      <Overlay className={cn('lg:hidden', overlayClassName)} isHidden={!isMenuOpened} content="right">
        <div
          ref={mobileMenuRef}
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

            {!user && (
              <>
                <Divider />
                <HeaderMenu orientation="vertical" items={authMenuItems} />
              </>
            )}
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default MobileMenu;
