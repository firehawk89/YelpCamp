import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';

import FeatureList from './FeatureList';

const Features = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('container mx-auto flex flex-col gap-8 py-16 md:gap-10 md:py-20', className)} {...props}>
    <h2 className="text-center text-2xl font-semibold md:text-3xl">Why Choose CampZone?</h2>
    <FeatureList />
  </div>
);

export default Features;
