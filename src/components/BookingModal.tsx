import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Book Your Jump!</DialogTitle>
          <DialogDescription className="text-center">
            Call us directly or visit our park to book your slot
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold text-lg mb-2">Online Booking Coming Soon!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We're working on bringing you a seamless online booking experience with payment gateway integration.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-center">Book Now Via Phone</h4>
            <div className="flex flex-col gap-2">
              <a
                href="tel:9111385771"
                className="flex items-center justify-center gap-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                <Phone className="text-primary" size={20} />
                <span className="font-semibold">9111385771</span>
              </a>
              {/* <a
                href="tel:8889006941"
                className="flex items-center justify-center gap-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                <Phone className="text-primary" size={20} />
                <span className="font-semibold">8889006941</span>
              </a> */}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Price:</strong> ₹800 per person
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Special rates available for group bookings
            </p>
          </div>

          <Button onClick={onClose} variant="outline" className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;