import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const FirstVisitPopup = () => {
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
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="relative bg-card rounded-3xl overflow-hidden shadow-2xl">
              {/* Header with gradient */}
              <div className="gradient-hero p-8 text-center text-primary-foreground relative overflow-hidden">
                {/* Floating decorations */}
                <motion.div
                  className="absolute top-4 left-4 text-2xl"
                  animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎈
                </motion.div>
                <motion.div
                  className="absolute top-4 right-4 text-2xl"
                  animate={{ y: [0, -10, 0], rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  🎉
                </motion.div>
                <motion.div
                  className="absolute bottom-4 left-8 text-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
                <motion.div
                  className="absolute bottom-4 right-8 text-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  ✨
                </motion.div>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/40 transition-colors"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Gift icon */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <Gift className="w-16 h-16" />
                </motion.div>

                <h3 className="text-2xl font-heading font-bold mb-2">
                  Welcome Offer! 🎊
                </h3>
                <p className="text-sm opacity-90">
                  First time here? We've got something special for you!
                </p>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                {/* Offer card */}
                <motion.div
                  className="bg-muted rounded-2xl p-6 mb-6 relative overflow-hidden"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Coupon style border */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-card rounded-r-full" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-card rounded-l-full" />

                  <p className="text-sm text-muted-foreground mb-2">Get</p>
                  <p className="text-4xl font-heading font-bold gradient-text mb-2">
                    10% OFF
                  </p>
                  <p className="text-sm text-muted-foreground">
                    on your first booking!
                  </p>
                  
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="font-mono text-lg font-bold text-foreground bg-accent/20 px-3 py-1 rounded">
                      TAKEOFF10
                    </span>
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                </motion.div>

                <p className="text-sm text-muted-foreground mb-6">
                  Use code <strong>TAKEOFF10</strong> while booking to avail this offer!
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleClose}
                    className="flex-1 btn-bounce gradient-primary text-primary-foreground shadow-button"
                  >
                    Claim Offer
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
};

export default FirstVisitPopup;
