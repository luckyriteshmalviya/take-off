import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import FirstVisitPopup, { FirstVisitPopupRef } from "@/components/FirstVisitPopup";

const Index = () => {
  const popupRef = useRef<FirstVisitPopupRef>(null);

  const handleOfferClick = () => {
    popupRef.current?.openPopup();
  };

  return (
    <div className="min-h-screen">
      <Header onOfferClick={handleOfferClick} />
      <main>
        <HeroSection />
        <AboutSection />
        <ActivitiesSection />
        <FacilitiesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <FirstVisitPopup ref={popupRef} />
    </div>
  );
};

export default Index;
