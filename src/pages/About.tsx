import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Heart, Target, Users, Award, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "We maintain the highest safety standards with regular equipment checks, trained staff, and comprehensive safety briefings for all visitors.",
    },
    {
      icon: Heart,
      title: "Family Fun",
      description: "We believe in creating joyful memories. Our park is designed to bring families together through shared experiences and laughter.",
    },
    {
      icon: Target,
      title: "Quality Experience",
      description: "From our world-class equipment to our friendly staff, we ensure every visit exceeds expectations.",
    },
    {
      icon: Users,
      title: "Inclusive Environment",
      description: "Activities for all ages and abilities. Everyone deserves to experience the joy of bouncing!",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're committed to being Bhopal's best trampoline park through continuous improvement and innovation.",
    },
    {
      icon: Zap,
      title: "Active Lifestyle",
      description: "We promote fitness through fun. Trampolining is an excellent workout disguised as play!",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <motion.div
            className="absolute top-20 -left-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="container-custom relative text-center text-primary-foreground">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            >
              About Take Off 🎪
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
            >
              Bhopal's premier trampoline park, where adventure meets safety and fun knows no bounds!
            </motion.p>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Our <span className="gradient-text">Story</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Take Off Trampoline Park was born from a simple vision: to create a space 
                    where families in Bhopal could experience world-class entertainment right 
                    in their own city.
                  </p>
                  <p>
                    What started as a dream in 2019 has grown into Madhya Pradesh's most loved 
                    trampoline park. We've hosted thousands of birthday parties, corporate 
                    events, and family outings, each one creating memories that last a lifetime.
                  </p>
                  <p>
                    Our state-of-the-art facility features 16+ exciting activities, all designed 
                    with international safety standards in mind. From toddlers taking their first 
                    jumps to adults reliving their childhood, Take Off welcomes everyone.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-video bg-muted rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-0 gradient-hero opacity-80 flex items-center justify-center">
                    <motion.div
                      className="text-center text-primary-foreground"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-8xl block mb-4">🎢</span>
                      <p className="text-2xl font-heading font-bold">Since 2019</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-3xl p-8 shadow-card"
              >
                <span className="text-5xl block mb-4">🎯</span>
                <h3 className="text-2xl font-heading font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide a safe, fun, and memorable experience for visitors of all ages. 
                  We're committed to promoting active lifestyles through innovative entertainment 
                  that brings joy to our community.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-3xl p-8 shadow-card"
              >
                <span className="text-5xl block mb-4">🌟</span>
                <h3 className="text-2xl font-heading font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become Central India's leading family entertainment destination, known for 
                  excellence in safety, innovation, and customer satisfaction. We aim to expand 
                  and bring the Take Off experience to more cities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Our <span className="gradient-text">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at Take Off.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-muted rounded-2xl p-6 card-hover"
                >
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 gradient-hero text-primary-foreground">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "5+", label: "Years of Fun" },
                { number: "10K+", label: "Happy Visitors" },
                { number: "500+", label: "Parties Hosted" },
                { number: "16+", label: "Activities" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-4xl md:text-5xl font-heading font-bold mb-2">{stat.number}</p>
                  <p className="text-sm opacity-80">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
