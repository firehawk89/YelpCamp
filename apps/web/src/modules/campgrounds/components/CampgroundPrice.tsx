import { Campground } from '@/types/campground';
import { cn, round } from '@/utils/misc';
import { CurrencySignMap } from '@repo/types';
import { HTMLAttributes } from 'react';

interface CampgroundPriceProps extends HTMLAttributes<HTMLParagraphElement> {
  price: Campground['price'];
  className?: string;
  preview?: boolean;
}

const CampgroundPrice = ({ price, preview, className, ...props }: CampgroundPriceProps) => {
  const isFree = price?.value === 0;
  const formattedPrice = isFree ? 'Free' : `${round(price.value)} ${CurrencySignMap[price.currency]}`;

  return (
    <p
      className={cn('flex items-center max-sm:justify-center max-sm:gap-2 sm:flex-col sm:items-end', className)}
      {...props}
    >
      <span className={cn('text-lg font-semibold text-black', { 'text-base': preview })}>{formattedPrice}</span>
      {!isFree && <span className="text-neutral-500">per night</span>}
    </p>
  );
};

export default CampgroundPrice;
