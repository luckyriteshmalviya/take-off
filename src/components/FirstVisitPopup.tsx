import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import offerCoupon from "@/assets/offer-coupon.jpg";

export interface FirstVisitPopupRef {
  openPopup: () => void;
}

const FirstVisitPopup = forwardRef<FirstVisitPopupRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("takeoff_visited");
    
    if (!hasVisited) {
      // Show popup after a short delay on first visit
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    openPopup: () => setIsOpen(true),
  }));

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("takeoff_visited", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={handleClose}
          />

          {/* Popup - Centered using flexbox on parent + fixed positioning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-card rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full pointer-events-auto">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors shadow-lg"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Offer Image */}
              <div className="w-full">
                <img 
                  src={offerCoupon} 
                  alt="Buy 1 Get 1 Free - Launch Discount Pass" 
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* CTA Buttons */}
              <div className="p-6 bg-gradient-to-t from-card to-card/80">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleClose}
                    className="flex-1 btn-bounce gradient-primary text-primary-foreground shadow-button text-lg py-6"
                  >
                    Book Now 🎉
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

FirstVisitPopup.displayName = "FirstVisitPopup";

export default FirstVisitPopup;
