import { cn } from '@/utils/misc';
import { HeartIcon, StarIcon, ThumbUpIcon } from '@repo/ui/icons';
import { HTMLAttributes } from 'react';

const Features = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('container mx-auto px-4 py-16', className)} {...props}>
      <h2 className="mb-12 text-center text-3xl font-semibold">Why Choose CampZone?</h2>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-accent/10 rounded-full p-4">
            <StarIcon className="text-accent size-12" />
          </div>
          <h3 className="text-xl font-semibold">Rate & Review</h3>
          <p className="text-neutral-600">
            Share your experiences and help others find the perfect camping spot with our rating and review system.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-accent/10 rounded-full p-4">
            <HeartIcon className="text-accent size-12" />
          </div>
          <h3 className="text-xl font-semibold">Save Favorites</h3>
          <p className="text-neutral-600">
            Keep track of your favorite campgrounds and easily access them whenever you want to plan your next trip.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-accent/10 rounded-full p-4">
            <ThumbUpIcon className="text-accent size-12" />
          </div>
          <h3 className="text-xl font-semibold">Community Driven</h3>
          <p className="text-neutral-600">
            Join a community of campers who share their experiences, tips, and recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
