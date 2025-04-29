import CTA from '@/modules/home/CTA';
import Features from '@/modules/home/Features';
import Hero from '@/modules/home/Hero';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
