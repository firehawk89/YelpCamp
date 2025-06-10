'use client';

import { routes } from '@/app/routes';
import { Link } from '@/i18n/navigation';
import { cn } from '@/utils/misc';
import { buttonVariants } from '@repo/ui/button';
import { HTMLMotionProps, motion, MotionProps } from 'motion/react';
import { useTranslations } from 'next-intl';

const ANIMATION_VARIANTS: Record<string, MotionProps> = {
  TITLE: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-64px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  DESCRIPTION: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-64px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
  BUTTON: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-64px' },
    transition: {
      duration: 0.5,
      delay: 0.3,
      type: 'spring',
      stiffness: 100,
    },
  },
};

const CTA = ({ className, ...props }: HTMLMotionProps<'div'>) => {
  const t = useTranslations('pages.home.cta');

  return (
    <motion.div className={cn('bg-accent/5 py-16 md:py-20', className)} {...props}>
      <div className="mx-auto flex flex-col items-center gap-4 text-center max-md:container md:max-w-2xl md:gap-5">
        <motion.h2 className="text-2xl font-semibold md:text-3xl" {...ANIMATION_VARIANTS.TITLE}>
          {t('title')}
        </motion.h2>

        <motion.p className="text-neutral-600 md:text-lg" {...ANIMATION_VARIANTS.DESCRIPTION}>
          {t('description')}
        </motion.p>

        <motion.div className="flex flex-col gap-4 sm:flex-row" {...ANIMATION_VARIANTS.BUTTON}>
          <Link className={buttonVariants({ variant: 'accent', size: 'lg' })} href={routes.signUp()}>
            {t('actions.signUp')}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CTA;
