import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-muted to-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Visit <span className="text-primary">Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Come experience the fun at Take-off Trampoline Park in Misrod,
            Bhopal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Location
                  </h3>
                  <p className="text-muted-foreground">
                    Near RajaBhoj ITI, Misrod, Bhopal
                    <br />
                    Madhya Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-bounce-orange-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Contact Numbers
                  </h3>
                  <div className="space-y-1">
                    <a
                      href="tel:9111385771"
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      9111385771
                    </a>
                    {/* <a href="tel:8889006941" className="block text-muted-foreground hover:text-primary transition-colors">
                      8889006941
                    </a> */}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-bounce-yellow to-bounce-pink rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Opening Hours
                  </h3>
                  <p className="text-muted-foreground">
                    Open Daily
                    <br />
                    Call for timings
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="p-0 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps?q=23.16084776391898,77.46618011291046&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Take-off Trampoline Park location"
              ></iframe>
            </div>
          </Card>
        </div>

        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 border-2 border-primary/20 animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Jump?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Call us now to book your slot or just drop by! We're excited to
            welcome you to Bhopal's most fun trampoline park.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:9111385771"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              <Phone size={20} />
              Call Now: 9111385771
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
