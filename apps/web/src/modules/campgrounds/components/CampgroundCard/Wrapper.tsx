'use client';

import { HTMLMotionProps, motion } from 'motion/react';

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const CampgroundCardWrapper = ({ children, ...props }: HTMLMotionProps<'div'>) => (
  <motion.div variants={ANIMATION_VARIANTS} {...props}>
    {children}
  </motion.div>
);

export default CampgroundCardWrapper;
