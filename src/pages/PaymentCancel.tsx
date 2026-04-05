import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  const scrollToPricing = () => {
    navigate("/");
    // Small delay so the page navigates first, then scroll
    setTimeout(() => {
      const el = document.getElementById("pricing");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* Cancel Icon */}
        <div className="inline-flex w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full items-center justify-center shadow-2xl shadow-red-500/30 animate-scale-in">
          <XCircle size={48} className="text-white" />
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">
            Payment{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Cancelled
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Your payment was not completed. No charges have been made to your
            account.
          </p>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
          <p className="text-sm text-muted-foreground">
            If you experienced any issues during payment, feel free to contact us
            at{" "}
            <a
              href="tel:9111385771"
              className="text-primary font-semibold underline"
            >
              9111385771
            </a>{" "}
            for assistance.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={scrollToPricing}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 text-lg py-6"
          >
            <RotateCcw className="mr-2" size={20} />
            Try Again
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full text-lg py-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
