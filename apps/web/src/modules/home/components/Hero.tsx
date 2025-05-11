'use client';

import { routes } from '@/app/routes';
import useHeaderHeight from '@/hooks/useHeaderHeight';
import { cn } from '@/utils/misc';
import { buttonVariants } from '@repo/ui/button';
import { motion, MotionProps } from 'motion/react';
import Link from 'next/dist/client/link';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

const ANIMATION_VARIANTS: Record<string, MotionProps> = {
  TITLE: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  DESCRIPTION: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.2 },
  },
  BUTTONS: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay: 0.4 },
  },
};

const Hero = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const headerHeight = useHeaderHeight();

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ height: `calc(100dvh - ${headerHeight}px)` }}
      {...props}
    >
      <Image
        className="absolute inset-0 -z-10 object-cover object-center brightness-75"
        src="/homepage-hero-bg.jpg"
        alt="Camp"
        sizes="100vw"
        fill
        priority
      />

      <motion.div className="flex flex-col items-center gap-4 text-center text-white max-md:container md:max-w-2xl md:gap-5">
        <motion.h1 className="font-secondary text-4xl font-bold md:text-5xl" {...ANIMATION_VARIANTS.TITLE}>
          Welcome to CampZone!
        </motion.h1>
        <motion.p className="md:text-xl" {...ANIMATION_VARIANTS.DESCRIPTION}>
          Your ultimate destination for discovering and sharing campgrounds. Find your next outdoor adventure or list
          your own camping spot.
        </motion.p>

        <motion.div className="flex flex-col gap-4 sm:flex-row" {...ANIMATION_VARIANTS.BUTTONS}>
          <Link className={buttonVariants({ variant: 'accent', size: 'lg' })} href={routes.campgrounds.all()}>
            Browse Campgrounds
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
