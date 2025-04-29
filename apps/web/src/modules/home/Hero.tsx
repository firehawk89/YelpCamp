import { routes } from '@/app/routes';
import { cn } from '@/utils/misc';
import { buttonVariants } from '@repo/ui/button';
import Link from 'next/dist/client/link';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

const Hero = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('relative flex h-[80vh] items-center justify-center', className)} {...props}>
      <Image
        className="absolute inset-0 -z-10 object-cover object-center brightness-75"
        src="/landing-page-camp-background.avif"
        alt="Camp"
        sizes="100vw"
        fill
        priority
      />

      <div className="flex flex-col items-center gap-6 text-center text-white">
        <h1 className="font-secondary text-4xl font-medium md:text-5xl">Welcome to CampZone!</h1>
        <p className="max-w-2xl text-xl md:text-2xl">
          Discover amazing campgrounds, share your experiences, <br />
          and connect with fellow outdoor enthusiasts.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link className={buttonVariants({ variant: 'accent', size: 'lg' })} href={routes.campgrounds()}>
            Explore Campgrounds
          </Link>

          <Link className={buttonVariants({ variant: 'outline', size: 'lg' })} href={routes.signUp()}>
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
