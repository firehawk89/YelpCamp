import { cn } from '@/utils/misc';
import { buttonVariants } from '@repo/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Image
        className="absolute inset-0 -z-10 object-cover object-center brightness-75"
        src="/landing-page-camp-background.avif"
        alt="Camp"
        sizes="100vw"
        fill
      />
      <div className="flex flex-col items-center gap-3 text-center text-white">
        <h1 className="font-secondary text-3xl font-medium">Welcome to YelpCamp!</h1>
        <p className="text-xl">
          Jump right in and explore our many campgrounds. <br />
          Feel free to share some of your own and comment on others!
        </p>
        <Link className={cn(buttonVariants({ variant: 'accent' }), 'mt-3')} href="/campgrounds">
          Go to Campgrounds
        </Link>
      </div>
    </div>
  );
}
