import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, IndianRupee, Clock, Users } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    "Access to all 5 activities",
    "Safety equipment included",
    "Trained staff supervision",
    "Locker facility available",
    "Comfortable seating area",
  ];

  return (
    <>
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple <span className="text-primary">Pricing</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              One price for unlimited fun! Enjoy all activities at Take-off Trampoline Park
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-12 hover:shadow-2xl transition-all duration-300 border-2 border-primary/20 bg-gradient-to-br from-card to-muted/30 animate-scale-in">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-6">
                  <IndianRupee size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Entry Package</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ₹500
                  </span>
                </div>
                <p className="text-xl text-muted-foreground">per person</p>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Clock className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">Duration</p>
                    <p className="text-sm text-muted-foreground">Full day access</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Users className="text-secondary" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">Group Bookings</p>
                    <p className="text-sm text-muted-foreground">Special rates available</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 text-lg py-6"
              >
                Book Your Slot Now
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Walk-ins welcome! Call us for group bookings and party packages.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Pricing;