import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-10 bg-black relative overflow-hidden">
          <div className="container-custom relative text-center text-primary-foreground">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            >
              Contact Us 📧
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary text-lg md:text-xl max-w-3xl mx-auto opacity-90"
            >
              Have questions? We'd love to hear from you!
            </motion.p>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
