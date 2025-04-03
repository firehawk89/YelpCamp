'use client';

import { cn } from '@/utils/misc';
import { HTMLAttributes, MouseEvent, useEffect } from 'react';

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  isHidden?: boolean;
  content?: 'right' | 'left' | 'center';
}

const Overlay = ({ isHidden, content = 'center', className, onClick, ...props }: OverlayProps) => {
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClick?.(event);
    }
  };

  useEffect(() => {
    if (isHidden) document.body.style.overflow = 'auto';
    else document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isHidden]);

  return (
    <div
      className={cn(
        'fixed right-0 top-0 z-10 flex h-screen w-full bg-neutral-900 bg-opacity-50 transition-all',
        {
          'pointer-events-none opacity-0': isHidden,
          'justify-start': content === 'left',
          'items-center justify-center': content === 'center',
          'justify-end': content === 'right',
        },
        className
      )}
      onClick={handleOverlayClick}
      {...props}
    />
  );
};

export default Overlay;
