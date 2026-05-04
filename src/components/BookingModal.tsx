import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Loader2, X, CalendarIcon, Tag, Check, XCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { getPricePerPerson, toDateString } from "@/lib/pricing";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const today = new Date();
today.setHours(0, 0, 0, 0);

interface ActiveCoupon {
  code: string;
  type: string;
  amount: number;
  label: string;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [visitDate, setVisitDate] = useState<Date | undefined>(new Date());

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    numberOfPersons: 1,
  });

  // Promo Code State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponStatus, setCouponStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle");
  const [discountAmount, setDiscountAmount] = useState(0);

  // Available coupons for selection
  const [activeCoupons, setActiveCoupons] = useState<ActiveCoupon[]>([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);

  const pricePerPerson = getPricePerPerson(visitDate);
  const baseTotal = formData.numberOfPersons * pricePerPerson;
  const totalPrice = Math.max(0, baseTotal - discountAmount);

  const updatePersons = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      numberOfPersons: Math.min(20, Math.max(1, prev.numberOfPersons + delta)),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch active coupons when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setCouponsLoading(true);
    fetch("/.netlify/functions/get-active-coupons")
      .then((r) => r.json())
      .then((data) => {
        if (data.coupons) setActiveCoupons(data.coupons);
      })
      .catch(() => {})
      .finally(() => setCouponsLoading(false));
  }, [isOpen]);

  // Re-calculate discount when persons or date changes
  useEffect(() => {
    if (!appliedCoupon || couponStatus !== "valid") return;

    // Snapshot the current values at the moment the effect fires
    const currentPersons = formData.numberOfPersons;
    const currentPricePerPerson = getPricePerPerson(visitDate);
    const currentBaseTotal = currentPersons * currentPricePerPerson;

    // If coupon is in the active list, recalculate instantly — no API, no stale closure
    const localCoupon = activeCoupons.find(c => c.code === appliedCoupon);
    if (localCoupon) {
      applyLocalCoupon(localCoupon, currentBaseTotal, currentPersons);
      return;
    }

    // Manual code → re-validate via API with explicit snapshot values
    validateCouponWithSnapshot(appliedCoupon, currentBaseTotal, currentPersons);
  }, [formData.numberOfPersons, visitDate]);

  // Validates a manual code using explicit baseTotal/persons snapshot (no stale closure risk)
  const validateCouponWithSnapshot = async (code: string, snapshotBaseTotal: number, snapshotPersons: number) => {
    if (!code) return;
    setCouponStatus("loading");
    try {
      const res = await fetch("/.netlify/functions/validate-coupon", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.isValid) {
        let calculatedDiscount = 0;
        if (data.type === "percentage") {
          calculatedDiscount = (snapshotBaseTotal * data.amount) / 100;
        } else if (data.type === "flat") {
          calculatedDiscount = data.amount;
        } else if (data.type === "fixed") {
          calculatedDiscount = snapshotBaseTotal - (data.amount * snapshotPersons);
        }
        setCouponStatus("valid");
        setAppliedCoupon(code);
        setDiscountAmount(Math.max(0, calculatedDiscount));
      } else {
        setCouponStatus("invalid");
        setAppliedCoupon(null);
        setDiscountAmount(0);
      }
    } catch (e) {
      setCouponStatus("invalid");
      setAppliedCoupon(null);
      setDiscountAmount(0);
    }
  };

  const validateCoupon = async (code: string) => {
    if (!code) return;
    setCouponStatus("loading");
    try {
      const res = await fetch("/.netlify/functions/validate-coupon", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.isValid) {
        setCouponStatus("valid");
        setAppliedCoupon(code);

        let calculatedDiscount = 0;
        if (data.type === "percentage") {
          calculatedDiscount = (baseTotal * data.amount) / 100;
        } else if (data.type === "flat") {
          calculatedDiscount = data.amount;
        } else if (data.type === "fixed") {
          calculatedDiscount = baseTotal - (data.amount * formData.numberOfPersons);
        }
        setDiscountAmount(calculatedDiscount);

        if (code === couponInput) {
          toast({ title: "Promo Code Applied!", description: `You saved ₹${calculatedDiscount}` });
        }
      } else {
        setCouponStatus("invalid");
        setAppliedCoupon(null);
        setDiscountAmount(0);
      }
    } catch (e) {
      setCouponStatus("invalid");
      setAppliedCoupon(null);
      setDiscountAmount(0);
    }
  };

  const handleApplyCoupon = (e: React.MouseEvent) => {
    e.preventDefault();
    validateCoupon(couponInput);
  };

  // Instantly apply a coupon from the list — no API call needed since we already have type+amount
  const applyLocalCoupon = useCallback((coupon: ActiveCoupon, currentBaseTotal: number, persons: number) => {
    let discount = 0;
    if (coupon.type === "percentage") {
      discount = (currentBaseTotal * coupon.amount) / 100;
    } else if (coupon.type === "flat") {
      discount = coupon.amount;
    } else if (coupon.type === "fixed") {
      discount = currentBaseTotal - (coupon.amount * persons);
    }
    setAppliedCoupon(coupon.code);
    setCouponInput(coupon.code);
    setDiscountAmount(Math.max(0, discount));
    setCouponStatus("valid");
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponInput("");
    setDiscountAmount(0);
    setCouponStatus("idle");
  }, []);

  const handleSelectCoupon = useCallback((coupon: ActiveCoupon) => {
    if (appliedCoupon === coupon.code) {
      removeCoupon();
      return;
    }
    // Apply instantly from local data — instant switch, no loading spinner
    applyLocalCoupon(coupon, baseTotal, formData.numberOfPersons);
  }, [appliedCoupon, baseTotal, formData.numberOfPersons, applyLocalCoupon, removeCoupon]);

  const verifyPayment = async (response: any) => {
    try {
      const res = await fetch("/.netlify/functions/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      const data = await res.json();

      if (data.verified) {
        onClose();
        const params = new URLSearchParams({
          payment_id: response.razorpay_payment_id,
          amount: totalPrice.toString(),
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone,
          persons: formData.numberOfPersons.toString(),
          date: visitDate ? toDateString(visitDate) : "",
          price_per_person: pricePerPerson.toString(),
          ...(discountAmount > 0 ? { discount: discountAmount.toString() } : {}),
          ...(appliedCoupon ? { coupon: appliedCoupon } : {})
        });
        navigate(`/payment-success?${params.toString()}`);
      } else {
        toast({ title: "Payment Verification Failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Verification Error", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const openRazorpayCheckout = (orderData: any) => {
    const options = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Take-off Trampoline Park",
      description: `Entry Pass for ${formData.numberOfPersons} person(s)`,
      order_id: orderData.order_id,
      prefill: {
        name: formData.customerName,
        email: formData.customerEmail,
        contact: `+91${formData.customerPhone}`,
      },
      theme: { color: "#7c3aed" },
      handler: (response: any) => verifyPayment(response),
      modal: {
        ondismiss: () => {
          setIsLoading(false);
          toast({ title: "Payment Cancelled" });
        },
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.customerEmail.includes("@") || formData.customerPhone.length < 10 || !visitDate) {
      toast({ title: "Please fill all required fields correctly", variant: "destructive" });
      return;
    }

    if (!window.Razorpay) {
      toast({ title: "Payment Not Ready. Refresh page.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/.netlify/functions/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          numberOfPersons: formData.numberOfPersons,
          visitDate: toDateString(visitDate),
          pricePerPerson,
          couponCode: appliedCoupon || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      openRazorpayCheckout(data);
    } catch (error: any) {
      toast({ title: "Payment Error", description: error.message, variant: "destructive" });
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
          >
            {/* Modal — flex column, capped to viewport, internal scroll only if needed */}
            <div className="relative bg-card w-full sm:max-w-[440px] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[100dvh] sm:max-h-[96dvh]">

              {/* Fixed header */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0 border-b border-border/40">
                <h2 className="text-base font-bold text-foreground">🛫 Book Your Jump!</h2>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Scrollable form body */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-2.5 min-h-0">

                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <Label className="text-xs text-muted-foreground">Full Name</Label>
                    <Input name="customerName" placeholder="John Doe" value={formData.customerName} onChange={handleInputChange} className="h-9 rounded-lg text-sm" required />
                  </div>
                  <div className="space-y-0.5">
                    <Label className="text-xs text-muted-foreground">Phone</Label>
                    <Input name="customerPhone" type="tel" maxLength={10} placeholder="9876543210" value={formData.customerPhone} onChange={(e) => setFormData(p => ({...p, customerPhone: e.target.value.replace(/\D/g, "")}))} className="h-9 rounded-lg text-sm" required />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="space-y-0.5">
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <Input name="customerEmail" type="email" placeholder="john@example.com" value={formData.customerEmail} onChange={handleInputChange} className="h-9 rounded-lg text-sm" required />
                </div>

                {/* Row 3: Date + Persons */}
                <div className="grid grid-cols-2 gap-2 items-end">
                  <div className="space-y-0.5">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1"><CalendarIcon size={11} /> Visit Date</Label>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <button type="button" className="w-full h-9 px-3 rounded-lg text-sm text-left border border-input bg-background flex items-center">
                          {visitDate ? format(visitDate, "dd MMM yyyy") : "Pick date"}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={visitDate} onSelect={(d) => { setVisitDate(d); setCalendarOpen(false); }} disabled={(d) => d < today} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-0.5">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1"><span className="w-[11px]" />Persons</Label>
                    <div className="flex items-center justify-between border rounded-lg h-9 px-2 bg-background">
                      <button type="button" onClick={() => updatePersons(-1)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted"><Minus size={13} /></button>
                      <span className="font-bold text-sm">{formData.numberOfPersons}</span>
                      <button type="button" onClick={() => updatePersons(1)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted"><Plus size={13} /></button>
                    </div>
                  </div>
                </div>

                {/* Coupon section */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1"><Tag size={11} /> Offers & Promo</Label>

                  {couponsLoading ? (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground h-7">
                      <Loader2 className="w-3 h-3 animate-spin" /> Loading offers…
                    </div>
                  ) : activeCoupons.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {activeCoupons.map((coupon) => {
                        const isSelected = appliedCoupon === coupon.code;
                        const isPending = couponStatus === "loading" && couponInput === coupon.code && appliedCoupon === null;
                        return (
                          <div key={coupon.code} className="relative">
                            <button
                              type="button"
                              onClick={() => handleSelectCoupon(coupon)}
                              disabled={isPending}
                              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 ${
                                isSelected
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm pr-6"
                                  : "bg-background border-border hover:border-primary hover:bg-primary/5 text-foreground"
                              }`}
                            >
                              {isPending
                                ? <Loader2 size={11} className="animate-spin shrink-0" />
                                : isSelected
                                  ? <Check size={11} className="shrink-0" />
                                  : <Tag size={11} className="shrink-0 text-primary" />}
                              <span className="font-mono">{coupon.code}</span>
                              <span className={`px-1 py-0.5 rounded text-[10px] font-bold ${isSelected ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
                                {coupon.label}
                              </span>
                            </button>
                            {/* X button — visible only on the selected pill */}
                            {isSelected && (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeCoupon(); }}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-red-500 text-white transition-colors"
                                aria-label="Remove coupon"
                              >
                                <X size={9} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}

                  {couponStatus === "invalid" && <p className="text-xs text-red-500 flex items-center gap-1"><XCircle size={11}/> Invalid or expired code</p>}

                  {!appliedCoupon && (
                    <button type="button" onClick={() => setShowManualInput((v) => !v)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <ChevronDown size={11} className={`transition-transform ${showManualInput ? "rotate-180" : ""}`} />
                      {showManualInput ? "Hide" : "Have a different code?"}
                    </button>
                  )}

                  {(showManualInput || (appliedCoupon && activeCoupons.every(c => c.code !== appliedCoupon))) && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. OFFER50"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); if (couponStatus !== "idle") setCouponStatus("idle"); }}
                        className="h-9 rounded-lg text-sm uppercase"
                        disabled={appliedCoupon !== null}
                      />
                      {appliedCoupon ? (
                        <Button type="button" variant="outline" className="h-9 text-xs text-red-500 px-3" onClick={() => { setAppliedCoupon(null); setCouponInput(""); setDiscountAmount(0); setCouponStatus("idle"); }}>Remove</Button>
                      ) : (
                        <Button type="button" variant="secondary" className="h-9 text-xs px-3" onClick={handleApplyCoupon} disabled={!couponInput || couponStatus === "loading"}>
                          {couponStatus === "loading" ? <Loader2 className="w-3 h-3 animate-spin" /> : "Apply"}
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Price + Pay — combined bottom card */}
                <div className="rounded-xl overflow-hidden border border-border/60">
                  {/* Breakdown rows */}
                  <div className="px-3 py-2 space-y-1 bg-muted/40">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formData.numberOfPersons} person{formData.numberOfPersons > 1 ? "s" : ""} × ₹{pricePerPerson}</span>
                      <span className="font-medium text-foreground">₹{baseTotal.toLocaleString("en-IN")}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-xs font-medium text-green-600">
                        <span>Discount ({appliedCoupon})</span>
                        <span>− ₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>

                  {/* Total + Pay */}
                  <div className="flex items-center justify-between px-3 py-2.5 bg-background">
                    <div className="leading-none">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Total Payable</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-sm font-semibold text-primary">₹</span>
                        <span className="text-2xl font-extrabold text-primary tracking-tight">
                          {totalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 h-11 px-5 rounded-xl text-sm font-semibold shrink-0">
                      {isLoading ? <><Loader2 className="mr-1.5 w-4 h-4 animate-spin" />Processing…</> : "Pay Now →"}
                    </Button>
                  </div>
                </div>

              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;

