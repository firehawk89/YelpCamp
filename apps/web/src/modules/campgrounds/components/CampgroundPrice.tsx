import { Campground } from '@/types/campground';
import { CurrencySignMap } from '@/types/misc';
import { cn, round } from '@/utils/misc';
import { HTMLAttributes } from 'react';

interface CampgroundPriceProps extends HTMLAttributes<HTMLParagraphElement> {
  price: Campground['price'];
  className?: string;
}

const CampgroundPrice = ({ price, className, ...props }: CampgroundPriceProps) => {
  const isFree = price?.value === 0;
  const formattedPrice = isFree ? 'Free' : `${round(price.value)} ${CurrencySignMap[price.currency]}`;

  return (
    <p
      className={cn('flex items-center max-sm:justify-center max-sm:gap-2 sm:flex-col sm:items-end', className)}
      {...props}
    >
      <span className="text-lg font-semibold text-black">{formattedPrice}</span>
      {!isFree && <span className="text-neutral-500">per night</span>}
    </p>
  );
};

export default CampgroundPrice;
