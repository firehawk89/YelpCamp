'use client';

import { cn } from '@/utils/misc';
import { HTMLMotionProps, motion, MotionProps } from 'motion/react';

import { FEATURES } from '../../helpers';
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

const FeatureList = ({ className, ...props }: HTMLMotionProps<'section'>) => (
  <motion.section
    className={cn('grid gap-8 md:grid-cols-3 md:gap-10', className)}
    variants={ANIMATION_VARIANTS}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-64px' }}
    {...props}
  >
    {FEATURES.map((feature) => (
      <FeatureItem key={feature.title} feature={feature} />
    ))}
  </motion.section>
);

export default FeatureList;
