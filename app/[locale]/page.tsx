import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../../components/Header/Header'), { ssr: false });
const HeroSection = dynamic(() => import('../../components/Hero/HeroSection'), { ssr: false });
const TeamSection = dynamic(() => import('../../components/Team/TeamSection'), { ssr: false });
const TestimonialsSection = dynamic(() => import('../../components/Testimonials/TestimonialsSection'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer/Footer'), { ssr: false });

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark">
      <Header />
      <HeroSection />
      <TeamSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
