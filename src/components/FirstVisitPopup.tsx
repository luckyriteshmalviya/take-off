import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import offerCoupon from "@/assets/offer-coupon.jpg";
import { useNavigate } from "react-router-dom";

export interface FirstVisitPopupRef {
  openPopup: () => void;
}

interface FirstVisitPopupProps {
  onBookNow?: () => void;
}

const FirstVisitPopup = forwardRef<FirstVisitPopupRef, FirstVisitPopupProps>(({ onBookNow }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Not required right now
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsOpen(true);
  //   }, 1500); // slight delay for better UX
  //
  //   return () => clearTimeout(timer);
  // }, []);

  useImperativeHandle(ref, () => ({
    openPopup: () => setIsOpen(true),
  }));

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBookNow = () => {
    setIsOpen(false);
    if (onBookNow) {
      onBookNow();
    } else {
      navigate("/pricing");
    }
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
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", damping: 18 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-card rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full">
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Offer Image */}
              <div className="p-4">
                <img
                  src={offerCoupon}
                  alt="Buy 1 Get 1 Free - Offer"
                  className="rounded-sm w-full h-auto object-contain"
                />
              </div>

              <div className="px-4 text-sm text-muted-foreground">
                Offer extended to 15 Feb 🎉
              </div>
              <div className="px-4 text-sm text-muted-foreground">
                Note :- Valid only for weekdays (Mon - Fri)
              </div>


              {/* CTA */}
              <div className="p-6 bg-gradient-to-t from-card to-card/80">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleBookNow}
                    className="flex-1 btn-bounce gradient-primary shadow-button text-lg py-6"
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
