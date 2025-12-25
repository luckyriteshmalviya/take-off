import { Phone, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground leading-tight">Take-off</span>
                <span className="text-xs text-muted-foreground">Trampoline Park</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Bhopal's premier trampoline park for unlimited fun and adventure!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("activities")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Activities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="text-muted-foreground">
                  Misrod, Bhopal<br />
                  Madhya Pradesh, India
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-primary flex-shrink-0 mt-1" size={20} />
                <div className="space-y-1">
                  <a href="tel:9111385771" className="block text-muted-foreground hover:text-primary transition-colors">
                    9111385771
                  </a>
                  {/* <a href="tel:8889006941" className="block text-muted-foreground hover:text-primary transition-colors">
                    8889006941
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Take-off Trampoline Park. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;