import { cn } from '@/utils/misc';
import { buttonVariants } from '@repo/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Image
        className="absolute -z-10 inset-0 object-cover object-center brightness-75"
        src="/landing-page-camp-background.avif"
        alt="Camp"
        sizes="100vw"
        fill
      />
      <div className="flex flex-col items-center gap-4 text-white text-center">
        <h1 className="text-3xl font-medium font-secondary">Welcome to YelpCamp!</h1>
        <p className="text-xl">
          Jump right in and explore our many campgrounds. <br />
          Feel free to share some of your own and comment on others!
        </p>
        <Link className={cn(buttonVariants(), 'mt-3')} href="/campgrounds">
          Go to Campgrounds
        </Link>
      </div>
    </div>
  );
}
