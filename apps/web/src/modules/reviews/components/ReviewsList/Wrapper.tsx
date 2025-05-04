'use client';

import { HTMLMotionProps, motion } from 'motion/react';

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const ReviewsListWrapper = ({ children, ...props }: HTMLMotionProps<'ul'>) => (
  <motion.ul variants={ANIMATION_VARIANTS} initial="hidden" animate="show" {...props}>
    {children}
  </motion.ul>
);

export default ReviewsListWrapper;
