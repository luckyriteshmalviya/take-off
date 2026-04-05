import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
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

        <h1 className="text-3xl font-bold text-foreground mb-2">Terms & Conditions</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By booking a session and/or entering Take-off Trampoline Park, you agree to be bound by these
              Terms and Conditions. If you do not agree, please do not use our services or purchase tickets.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Booking & Entry</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Entry pricing is as displayed on the website at the time of booking and includes access to all activities. Prices may vary during promotions or special offers.</li>
              <li>Bookings are confirmed only upon successful payment.</li>
              <li>You must present your booking reference (Payment ID) at reception upon arrival.</li>
              <li>Sessions are subject to availability and operational capacity.</li>
              <li>Management reserves the right to limit the number of participants at any time for safety.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Safety Rules</h2>
            <p>All visitors must follow these safety guidelines:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Wear the safety gear provided at all times while using equipment.</li>
              <li>Follow all instructions given by park staff and safety marshals.</li>
              <li>No food, drinks, or chewing gum on the trampoline areas.</li>
              <li>Remove all jewellery, watches, and sharp objects before jumping.</li>
              <li>No double bouncing, flips, or stunts without staff supervision.</li>
              <li>Children under 10 must be accompanied by an adult at all times.</li>
              <li>Persons under the influence of alcohol or drugs are not permitted.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Liability & Assumption of Risk</h2>
            <p>
              Trampoline activities involve inherent risks including, but not limited to, sprains, fractures,
              and other injuries. By entering the park, you acknowledge and accept these risks.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Take-off Trampoline Park is not liable for injuries resulting from failure to follow safety rules.</li>
              <li>Visitors participate in all activities at their own risk.</li>
              <li>A liability waiver may be required to be signed before entry.</li>
              <li>We are not responsible for loss or damage to personal belongings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Age & Health Requirements</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Visitors with heart conditions, back/neck problems, or pregnancy are advised not to participate.</li>
              <li>If you have any medical condition that may be affected by physical activity, consult your doctor before visiting.</li>
              <li>Management reserves the right to refuse entry for health and safety reasons.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Code of Conduct</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Treat staff and other visitors with respect.</li>
              <li>No abusive language, threatening behaviour, or misconduct.</li>
              <li>Management reserves the right to remove any visitor who violates the code of conduct without a refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Intellectual Property</h2>
            <p>
              All content on this website — including logos, text, images, and design — is the property of
              Take-off Trampoline Park and may not be reproduced without written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India. Any disputes
              arising from these terms shall be subject to the exclusive jurisdiction of the courts in Bhopal,
              Madhya Pradesh.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Contact</h2>
            <p>
              For questions about these terms, contact us at:
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

export default TermsAndConditions;
