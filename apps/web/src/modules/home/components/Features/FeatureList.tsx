'use client';

import { cn } from '@/utils/misc';
import { HTMLMotionProps, motion, MotionProps } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Feature } from '../../helpers';
import FeatureItem from './FeatureItem';

const ANIMATION_VARIANTS: MotionProps['variants'] = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const FeatureList = ({ className, ...props }: HTMLMotionProps<'section'>) => {
  const t = useTranslations('pages.home.features');

  const features: Feature[] = useMemo(
    () => [
      {
        icon: 'map',
        title: t('findPerfectSpots.title'),
        description: t('findPerfectSpots.description'),
      },
      {
        icon: 'chat',
        title: t('shareYourExperience.title'),
        description: t('shareYourExperience.description'),
      },
      {
        icon: 'userGroup',
        title: t('joinTheCommunity.title'),
        description: t('joinTheCommunity.description'),
      },
    ],
    [t]
  );

  return (
    <motion.section
      className={cn('grid gap-8 md:grid-cols-3 md:gap-10', className)}
      variants={ANIMATION_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-64px' }}
      {...props}
    >
      {features.map((feature) => (
        <FeatureItem key={feature.title} feature={feature} />
      ))}
    </motion.section>
  );
};

export default FeatureList;
