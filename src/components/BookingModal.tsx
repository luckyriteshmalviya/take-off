import { AnimatePresence, motion } from "framer-motion";
import { IndianRupee, Minus, Plus, Loader2, X, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getPricePerPerson, getDayType, toDateString, type DayType } from "@/lib/pricing";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

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

  const pricePerPerson = getPricePerPerson(visitDate);
  const totalPrice = formData.numberOfPersons * pricePerPerson;
  const dayType: DayType = visitDate ? getDayType(visitDate) : "Weekday";
  const isSpecial = pricePerPerson === 1000;

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

  const verifyPayment = async (response: RazorpayResponse) => {
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
        });
        navigate(`/payment-success?${params.toString()}`);
      } else {
        toast({
          title: "Payment Verification Failed",
          description: "Please contact support if amount was deducted.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Verification Error",
        description: "Could not verify payment. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openRazorpayCheckout = (orderData: {
    order_id: string;
    amount: number;
    currency: string;
    key_id: string;
  }) => {
    const options: RazorpayOptions = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Take-off Trampoline Park",
      description: `Entry Pass for ${formData.numberOfPersons} person${formData.numberOfPersons > 1 ? "s" : ""}${visitDate ? ` on ${format(visitDate, "dd MMM yyyy")}` : ""}`,
      order_id: orderData.order_id,
      prefill: {
        name: formData.customerName,
        email: formData.customerEmail,
        contact: `+91${formData.customerPhone}`,
      },
      theme: { color: "#7c3aed" },
      handler: (response: RazorpayResponse) => {
        verifyPayment(response);
      },
      modal: {
        ondismiss: () => {
          setIsLoading(false);
          toast({
            title: "Payment Cancelled",
            description: "You can try again anytime.",
          });
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!formData.customerEmail.trim() || !formData.customerEmail.includes("@")) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    if (!formData.customerPhone.trim() || formData.customerPhone.length < 10) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }
    if (!visitDate) {
      toast({ title: "Please select a visit date", variant: "destructive" });
      return;
    }

    if (!window.Razorpay) {
      toast({
        title: "Payment Not Ready",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      openRazorpayCheckout(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create order";
      toast({
        title: "Payment Error",
        description: message,
        variant: "destructive",
      });
      setIsLoading(false);
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
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
          >
            <div className="relative bg-card w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[95dvh] sm:max-h-none overflow-y-auto sm:overflow-visible">

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors shadow-lg"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>

              {/* Header */}
              <div className="pt-5 pb-1 px-5 text-center">
                <h2 className="text-xl font-bold text-foreground">Book Your Jump!</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Fill in your details and pay securely via Razorpay
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-3">

                {/* Name */}
                <div className="space-y-1">
                  <Label htmlFor="customerName" className="text-sm">Full Name</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    placeholder="Enter your full name"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="h-10 rounded-xl text-sm"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="customerEmail" className="text-sm">Email</Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="h-10 rounded-xl text-sm"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <Label htmlFor="customerPhone" className="text-sm">Phone Number</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none">+91</span>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="98XXXXXXXX"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      value={formData.customerPhone}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/\D/g, "").slice(0, 10);
                        setFormData((prev) => ({ ...prev, customerPhone: target.value }));
                      }}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="h-10 rounded-xl text-sm pl-12"
                      required
                    />
                  </div>
                </div>

                {/* Visit Date + Persons — 2-col grid */}
                <div className="grid grid-cols-2 gap-3">

                  {/* ── Date Picker ── */}
                  <div className="space-y-1">
                    <Label className="text-sm flex items-center gap-1">
                      <CalendarIcon size={13} />
                      Visit Date
                    </Label>

                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          disabled={isLoading}
                          className={cn(
                            "w-full h-10 px-3 rounded-xl text-sm text-left font-normal",
                            "border border-input bg-background text-foreground",
                            "flex items-center justify-between gap-1",
                            "hover:bg-muted/50 transition-colors",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            !visitDate && "text-muted-foreground"
                          )}
                        >
                          <span className="truncate text-xs">
                            {visitDate
                              ? format(visitDate, "dd MMM yyyy")
                              : "Pick date"}
                          </span>
                          <CalendarIcon size={14} className="shrink-0 text-muted-foreground" />
                        </button>
                      </PopoverTrigger>

                      {/* Popover opens upward on mobile via side="top", centered on desktop */}
                      <PopoverContent
                        className="w-auto p-0 rounded-2xl shadow-2xl border border-border"
                        align="start"
                        side="top"
                        sideOffset={8}
                        avoidCollisions
                      >
                        <Calendar
                          mode="single"
                          selected={visitDate}
                          onSelect={(d) => {
                            setVisitDate(d);
                            setCalendarOpen(false);
                          }}
                          disabled={(d) => d < today}
                          initialFocus
                          className="rounded-2xl"
                        />
                        {/* Weekend/Weekday rate hint inside popover */}
                        {visitDate && (
                          <div className="px-3 pb-3">
                            <div
                              className={cn(
                                "flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg",
                                isSpecial
                                  ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
                                  : "bg-green-500/15 text-green-700 dark:text-green-400"
                              )}
                            >
                              <span className={cn("w-2 h-2 rounded-full", isSpecial ? "bg-orange-500" : "bg-green-500")} />
                              {isSpecial ? `${dayType} · ₹1,000/person` : "Weekday · ₹800/person"}
                            </div>
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>

                    {/* Rate badge below trigger (always visible) */}
                    {visitDate && (
                      <div
                        className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full",
                          isSpecial
                            ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
                            : "bg-green-500/15 text-green-700 dark:text-green-400"
                        )}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", isSpecial ? "bg-orange-500" : "bg-green-500")} />
                        {isSpecial ? `${dayType} ₹1,000` : "Weekday ₹800"}
                      </div>
                    )}
                  </div>

                  {/* ── Persons Counter ── */}
                  <div className="space-y-1">
                    <Label className="text-sm">Persons</Label>
                    <div className="flex items-center justify-between gap-1 border border-input rounded-xl h-10 px-2 bg-background">
                      <button
                        type="button"
                        onClick={() => updatePersons(-1)}
                        disabled={formData.numberOfPersons <= 1 || isLoading}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40 shrink-0"
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-base font-bold tabular-nums">
                        {formData.numberOfPersons}
                      </span>
                      <button
                        type="button"
                        onClick={() => updatePersons(1)}
                        disabled={formData.numberOfPersons >= 20 || isLoading}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40 shrink-0"
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                </div>
                {/* ── end grid ── */}

                {/* Price Summary */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                  {/* Left: breakdown */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
                    <span className="font-semibold text-foreground tabular-nums">
                      {formData.numberOfPersons}×
                    </span>
                    <span>₹{pricePerPerson.toLocaleString("en-IN")}</span>
                    {isSpecial && (
                      <span className="bg-orange-500/15 text-orange-600 dark:text-orange-400 font-semibold px-1.5 py-0.5 rounded-full text-[10px]">
                        {dayType}
                      </span>
                    )}
                  </div>
                  {/* Right: total */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    <IndianRupee size={18} className="text-primary" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tabular-nums">
                      {totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 text-base py-4 rounded-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${totalPrice.toLocaleString("en-IN")} Now`
                  )}
                </Button>

                <p className="text-center text-[11px] text-muted-foreground">
                  Secured by Razorpay. Payment popup will open on this page.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
