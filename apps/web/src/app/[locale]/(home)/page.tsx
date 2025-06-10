import CTA from '@/modules/home/components/CTA';
import Features from '@/modules/home/components/Features';
import Hero from '@/modules/home/components/Hero';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
