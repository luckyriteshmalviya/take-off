import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RefundPolicy = () => {
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

        <h1 className="text-3xl font-bold text-foreground mb-2">Refund & Cancellation Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. No Refund Policy</h2>
            <p>
              All bookings at Take-off Trampoline Park are <strong>non-refundable</strong> once the payment is
              confirmed. By completing your booking, you acknowledge and agree that no refunds will be issued
              for any reason, including but not limited to change of plans, inability to attend, or personal
              emergencies.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 my-4">
              <p className="text-red-500 font-semibold text-center m-0">
                ⚠️ All confirmed bookings are strictly non-refundable.
              </p>
            </div>
            <p>
              This policy is in line with standard industry practices followed by trampoline parks
              and indoor adventure facilities across India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Rescheduling of Booking Date</h2>
            <p>
              While refunds are not available, we understand that plans can change. Customers may request
              a <strong>one-time rescheduling</strong> of their booking date, subject to the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Rescheduling requests must be made at least <strong>24 hours before</strong> the originally booked date.</li>
              <li>The new date is subject to <strong>slot availability</strong>.</li>
              <li>Only <strong>one rescheduling</strong> is permitted per booking. Further changes will not be entertained.</li>
              <li>No change in the number of visitors or package type is allowed during rescheduling.</li>
              <li>
                The <strong>pricing applicable on the rescheduled date</strong> will apply. If the new date falls
                under a different pricing tier, promotional offer, or seasonal rate, the customer will be required
                to <strong>pay the difference</strong> (if the new date is priced higher). No refund of the
                price difference will be provided if the rescheduled date has a lower price.
              </li>
            </ul>
            <p>
              To request a reschedule, please contact us at{" "}
              <a href="tel:9111385771" className="text-primary underline">9111385771</a>{" "}
              with your booking details and Payment ID.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Exceptions — When Refunds Are Applicable</h2>
            <p>
              Refunds will <strong>only</strong> be issued under the following exceptional circumstances:
            </p>
            <div className="bg-muted/50 rounded-xl p-4 space-y-2 my-4">
              <div className="flex items-start gap-3 py-2 border-b border-border">
                <span className="text-green-500 font-bold text-lg mt-0.5">✓</span>
                <div>
                  <span className="font-medium text-foreground">Payment Discrepancy</span>
                  <p className="text-sm mt-1 mb-0">
                    If the amount charged is different from the booking amount, or if a duplicate payment
                    has been deducted, a full or partial refund (as applicable) will be processed after verification.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 py-2">
                <span className="text-green-500 font-bold text-lg mt-0.5">✓</span>
                <div>
                  <span className="font-medium text-foreground">Technical Glitch</span>
                  <p className="text-sm mt-1 mb-0">
                    If a booking fails due to a technical error on our website or payment gateway (e.g.,
                    payment was debited but booking was not confirmed), a full refund will be initiated
                    after investigation.
                  </p>
                </div>
              </div>
            </div>
            <p>
              In both cases, customers must report the issue within <strong>48 hours</strong> of the transaction
              along with supporting proof (screenshots, transaction IDs, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Cancellation by Take-off Trampoline Park</h2>
            <p>
              In the unlikely event that we need to cancel your booking due to unforeseen circumstances
              (maintenance, weather, safety concerns, or operational issues), you will receive a{" "}
              <strong>full refund</strong> or the option to reschedule at no additional cost, at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. No-Show Policy</h2>
            <p>
              If you do not arrive for your booking and have not contacted us for rescheduling,
              it will be treated as a <strong>no-show</strong> and no refund or rescheduling will be offered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Removal from Park</h2>
            <p>
              If a visitor is asked to leave due to violation of safety rules, code of conduct, or
              disruptive behaviour, <strong>no refund will be provided</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Refund Processing (For Eligible Cases)</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Eligible refunds will be processed within <strong>5–7 business days</strong> after verification.</li>
              <li>Refunds are credited back to the original payment method used during booking.</li>
              <li>Payment gateway processing fees, if any, are non-refundable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Contact Us</h2>
            <p>
              For rescheduling requests or to report a payment discrepancy / technical issue, please contact:
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

export default RefundPolicy;
