import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Button>

        <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>
              When you book a session at Take-off Trampoline Park, we collect the following personal information:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Full Name</strong> — to identify your booking</li>
              <li><strong>Email Address</strong> — to send booking confirmation and updates</li>
              <li><strong>Phone Number</strong> — to contact you regarding your booking</li>
              <li><strong>Payment Information</strong> — processed securely through Razorpay; we do not store card details</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Process and confirm your bookings</li>
              <li>Send booking confirmations and receipts</li>
              <li>Communicate important updates about your visit</li>
              <li>Improve our services and customer experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Payment Security</h2>
            <p>
              All payments are processed through <strong>Razorpay</strong>, a PCI DSS compliant payment gateway.
              We do not store, process, or have access to your complete credit/debit card details.
              Razorpay handles all payment data with industry-standard encryption and security protocols.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share data only with:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Razorpay</strong> — for payment processing</li>
              <li><strong>Law enforcement</strong> — if required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Data Retention</h2>
            <p>
              We retain your booking information for a period of 12 months from the date of your visit
              for record-keeping and customer support purposes. After this period, your data is securely deleted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href="tel:9111385771" className="text-primary underline">9111385771</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Cookies</h2>
            <p>
              Our website may use essential cookies to ensure proper functionality. We do not use
              tracking cookies or third-party analytics that collect personally identifiable information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at:
            </p>
            <p>
              <strong>Take-off Trampoline Park</strong><br />
              Misrod, Bhopal, Madhya Pradesh, India<br />
              Phone: <a href="tel:9111385771" className="text-primary underline">9111385771</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
