import { useState } from "react";
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
import BookingModal from "@/components/BookingModal";
import OffersModal from "@/components/OffersModal";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onOfferClick={() => setIsOffersOpen(true)} onBookNow={handleBookNow} />
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
      <OffersModal isOpen={isOffersOpen} onClose={() => setIsOffersOpen(false)} onBookNow={handleBookNow} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default Index;

