'use client';

import { cn } from '@/utils/misc';
import { UserGroupIcon } from '@repo/ui/icons';
import { ChatIcon } from '@repo/ui/icons';
import { MapIcon } from '@repo/ui/icons';
import { HTMLMotionProps, motion, MotionProps } from 'motion/react';
import { ReactNode } from 'react';

import { Feature, FeatureIcon } from '../../helpers';

const ANIMATION_VARIANTS: MotionProps['variants'] = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ICONS: Record<FeatureIcon, ReactNode> = {
  map: <MapIcon className="text-accent size-8 md:size-10" />,
  chat: <ChatIcon className="text-accent size-8 md:size-10" />,
  userGroup: <UserGroupIcon className="text-accent size-8 md:size-10" />,
};

interface FeatureItemProps extends HTMLMotionProps<'article'> {
  feature: Feature;
}

const FeatureItem = ({ feature, className, ...props }: FeatureItemProps) => (
  <motion.article
    key={feature.title}
    className={cn('flex flex-col items-center gap-3 text-center md:gap-4', className)}
    variants={ANIMATION_VARIANTS}
    {...props}
  >
    <motion.div className="bg-accent/10 rounded-full p-3 md:p-4">{ICONS[feature.icon]}</motion.div>

    <h3 className="text-lg font-semibold md:text-xl">{feature.title}</h3>
    <p className="text-neutral-600">{feature.description}</p>
  </motion.article>
);

export default FeatureItem;
