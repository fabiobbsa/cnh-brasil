import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
