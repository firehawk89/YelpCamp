'use client';

import { HTMLMotionProps, motion } from 'motion/react';

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ReviewCardWrapper = ({ children, ...props }: HTMLMotionProps<'li'>) => (
  <motion.li variants={ANIMATION_VARIANTS} {...props}>
    {children}
  </motion.li>
);

export default ReviewCardWrapper;
