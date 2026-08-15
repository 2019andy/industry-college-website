import { getSiteContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProgramsSection from '@/components/sections/ProgramsSection';
import PartnersSection from '@/components/sections/PartnersSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-white">
      <Header navigation={content.navigation} />
      <HeroSection heroStats={content.heroStats} />
      <AboutSection aboutHighlights={content.aboutHighlights} />
      <ProgramsSection programs={content.programs} />
      <PartnersSection partners={content.partners} />
      <NewsSection newsList={content.newsList} />
      <ContactSection contactInfo={content.contactInfo} />
      <Footer
        navigation={content.navigation}
        contactInfo={content.contactInfo}
        socialLinks={content.socialLinks}
      />
      <BackToTop />
    </main>
  );
}
