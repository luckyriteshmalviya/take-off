import { useRef, useState } from "react";
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
import BookingModal from "@/components/BookingModal";

const Index = () => {
  const popupRef = useRef<FirstVisitPopupRef>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOfferClick = () => {
    popupRef.current?.openPopup();
  };

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onOfferClick={handleOfferClick} onBookNow={handleBookNow} />
      <main>
        <HeroSection onBookNow={handleBookNow} />
        <AboutSection />
        <ActivitiesSection />
        <FacilitiesSection />
        <TestimonialsSection />
        <PricingSection onBookNow={handleBookNow} />
        <CTASection onBookNow={handleBookNow} />
        <ContactSection />
      </main>
      <Footer />
      <FirstVisitPopup ref={popupRef} onBookNow={handleBookNow} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default Index;

