import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOfferClick?: () => void;
  onBookNow?: () => void;
}

const navLinks = [
  { name: "Home", path: "/" },
  // { name: "About", path: "/about" },
  { name: "Activities", path: "/activities" },
  { name: "Gallery", path: "/gallery" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

const Header = ({ onOfferClick, onBookNow }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-3xl"
            >
              🎪
            </motion.div>
            <div>
              <h1 className="text-xl md:text-2xl font-heading font-bold text-primary">
                Take Off
              </h1>
              <p className="tex text-muted-foreground hidden sm:block">
                Trampoline Park
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`link-underline font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOfferClick}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
              aria-label="View Offers"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Gift className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="hidden lg:inline">Offers</span>
            </button>
            <a href="tel:9111385771" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">9111385771</span>
            </a>
            <Button onClick={onBookNow} className="btn-bounce gradient-primary text-primary-foreground shadow-button">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border"
          >
            <div className="container-custom py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-2 text-lg font-medium ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 flex flex-col gap-3"
              >
                <a
                  href="tel:9111385771"
                  className="flex items-center gap-2 text-foreground"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-primary">9111385771</span>
                </a>
                <Button onClick={onBookNow} className="w-full gradient-primary text-primary-foreground">
                  Book Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
