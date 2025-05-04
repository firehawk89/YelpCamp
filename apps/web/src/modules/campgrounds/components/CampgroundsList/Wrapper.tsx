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

const CampgroundsListWrapper = ({ children, ...props }: HTMLMotionProps<'div'>) => (
  <motion.div variants={ANIMATION_VARIANTS} initial="hidden" animate="show" {...props}>
    {children}
  </motion.div>
);

export default CampgroundsListWrapper;
