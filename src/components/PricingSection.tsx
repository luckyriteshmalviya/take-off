import { motion } from "framer-motion";
import { pricingPlans } from "@/data/pricing";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="section-padding bg-muted relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-2 gradient-hero" />
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-60 h-60 bg-secondary/20 rounded-full blur-3xl"
        animate={{ scale: [1.3, 1, 1.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-custom relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block text-4xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💰
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Simple & <span className="gradient-text">Affordable</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your adventure. No hidden fees, just pure fun!
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? "bg-foreground text-background shadow-2xl scale-105"
                  : "bg-card shadow-card"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="flex items-center gap-1 px-4 py-1 gradient-primary text-primary-foreground text-sm font-bold rounded-full shadow-button">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </motion.div>
              )}

              {/* Icon */}
              <motion.div
                className="text-5xl mb-6 text-center"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {plan.icon}
              </motion.div>

              {/* Plan Name */}
              <h3 className={`text-2xl font-heading font-bold text-center mb-2 ${
                plan.popular ? "text-background" : "text-foreground"
              }`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="text-center mb-6">
                <span className={`text-4xl font-heading font-bold ${
                  plan.popular ? "text-primary" : "gradient-text"
                }`}>
                  {plan.price}
                </span>
                <span className={`text-sm block ${
                  plan.popular ? "text-background/70" : "text-muted-foreground"
                }`}>
                  {plan.duration}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      plan.popular ? "text-primary" : "text-success"
                    }`} />
                    <span className={`text-sm ${
                      plan.popular ? "text-background/80" : "text-muted-foreground"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to="/contact">
                <Button
                  className={`w-full btn-bounce ${
                    plan.popular
                      ? "gradient-primary text-primary-foreground shadow-button"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          className="text-center text-muted-foreground mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          All prices include access to all activities & safety gear. 
          <Link to="/contact" className="text-primary font-medium hover:underline ml-1">
            Contact us
          </Link> for custom packages.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
