import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    // { name: "About Us", path: "/about" },
    { name: "Activities", path: "/activities" },
    { name: "Gallery", path: "/gallery" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-hero" />
      <div className="absolute top-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-custom section-padding relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🎪</span>
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary">Take Off</h3>
                <p className="text-xs text-background/60">Trampoline Park</p>
              </div>
            </Link>
            <p className="text-background/70 mb-6">
              Bhopal's most exciting trampoline park! Fun for kids, adults, and corporates. Jump into adventure today!
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-heading font-bold mb-6 text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-heading font-bold mb-6 text-primary">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="text-background/70">
                <span className="font-medium">Monday</span><br />
                11:30 AM - 9:00 PM
              </li>
               <li className="text-background/70">
                <span className="font-medium">Tuesday - Friday</span><br />
                11:00 AM - 9:00 PM
              </li>
              <li className="text-background/70">
                <span className="font-medium">Saturday - Sunday</span><br />
                11:00 AM - 9:30 PM
              </li>
              <li className="text-background/70">
                <span className="font-medium">Holidays</span><br />
                11:00 AM - 9:30 PM
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-heading font-bold mb-6 text-primary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-background/70">
                  Take Off Trampoline Park, Near Raja Bhoj ITI, Misrod, Bhopal (MP)
                </span>
              </li>
              <li>
                <a
                  href="tel:9111385771"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>9111385771</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@takeoff.org.in"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <p>info@takeoff.org.in
                  <br/>
                  director@takeoff.org.in</p>

                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm text-center md:text-left">
              © {currentYear} Take Off Trampoline Park. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
              <Link to="/privacy-policy" className="text-background/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-background/60 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund-policy" className="text-background/60 hover:text-primary transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
