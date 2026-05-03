import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, Copy, Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Coupon {
  code: string;
  type: string;
  amount: number;
  label: string;
}

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow?: () => void;
}

const OffersModal = ({ isOpen, onClose, onBookNow }: OffersModalProps) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch("/.netlify/functions/get-active-coupons")
      .then((r) => r.json())
      .then((data) => { if (data.coupons) setCoupons(data.coupons); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isOpen]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleBookNow = () => {
    onClose();
    onBookNow?.();
  };

  const getTypeDescription = (type: string, amount: number) => {
    if (type === "percentage") return `Get ${amount}% off your total booking`;
    if (type === "fixed") return `Entry at just ₹${amount} per person`;
    if (type === "flat") return `Flat ₹${amount} off your total booking`;
    return "";
  };

  const getBadgeColor = (type: string) => {
    if (type === "percentage") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    if (type === "fixed") return "bg-violet-500/10 text-violet-600 border-violet-500/20";
    return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary/90 to-primary px-6 pt-6 pb-8 text-primary-foreground">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-80">Active Offers</span>
                </div>
                <h2 className="text-2xl font-bold">Today's Deals 🎉</h2>
                <p className="text-sm opacity-70 mt-1">Apply these codes at checkout for instant savings</p>
              </div>

              {/* Coupon cards */}
              <div className="px-5 py-4 space-y-3 max-h-[50vh] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Loading offers…</span>
                  </div>
                ) : coupons.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm">No active offers right now.</p>
                    <p className="text-muted-foreground text-xs mt-1">Check back soon!</p>
                  </div>
                ) : (
                  coupons.map((coupon) => {
                    const isCopied = copiedCode === coupon.code;
                    return (
                      <div key={coupon.code} className="border border-border rounded-xl p-4 flex items-center gap-4 bg-background hover:border-primary/40 transition-colors">
                        {/* Dashed separator (coupon aesthetic) */}
                        <div className="shrink-0 flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Tag className="w-5 h-5 text-primary" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-base tracking-wider text-foreground">{coupon.code}</span>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeColor(coupon.type)}`}>
                              {coupon.label}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{getTypeDescription(coupon.type, coupon.amount)}</p>
                        </div>

                        {/* Copy button */}
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                            isCopied
                              ? "bg-green-500/10 text-green-600 border border-green-500/20"
                              : "bg-muted hover:bg-primary hover:text-primary-foreground border border-transparent"
                          }`}
                        >
                          {isCopied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer CTA */}
              <div className="px-5 pb-5 pt-2">
                <Button
                  onClick={handleBookNow}
                  className="w-full gradient-primary text-primary-foreground font-semibold py-5 rounded-xl btn-bounce shadow-button"
                >
                  Book Now & Apply Offer 🎉
                </Button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OffersModal;
