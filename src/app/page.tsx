import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ValuePillarsSection from '@/components/sections/ValuePillarsSection';
import CallToActionSection from '@/components/sections/CallToActionSection';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Header />
      <HeroSection />
      <ValuePillarsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
