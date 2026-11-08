import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import MascotStoryTabs from '@/components/sections/MascotStoryTabs';
import BentoUSP from '@/components/sections/BentoUSP';
import SocialProof from '@/components/sections/SocialProof';
import ComboOffer from '@/components/sections/ComboOffer';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/features/CartDrawer';
import SamAIChatbot from '@/components/features/SamAIChatbot';
import SkipLink from '@/components/ui/SkipLink';

export default function Home() {
  return (
    <>
      <SkipLink />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="sam-anchor">
        <HeroSection />
        <MascotStoryTabs />
        <BentoUSP />
        <SocialProof />
        <ComboOffer />
      </main>

      <Footer />
      <CartDrawer />
      <SamAIChatbot />
    </>
  );
}
