import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { activities } from "@/data/activities";

const Activities = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <motion.div
            className="absolute bottom-10 right-10 text-9xl opacity-20"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🎢
          </motion.div>
          <div className="container-custom relative text-center text-primary-foreground">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            >
              Our Activities 🎪
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
            >
              16+ thrilling activities for all ages! From foam pits to wall climbing, 
              discover endless fun at Take Off.
            </motion.p>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className={`relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br ${activity.color} shadow-card`}>
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-primary-foreground">
                      <motion.span
                        className="text-5xl"
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        transition={{ type: "spring" }}
                      >
                        {activity.icon}
                      </motion.span>
                      
                      <div>
                        <h3 className="text-xl font-heading font-bold mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-sm opacity-90 line-clamp-3">
                          {activity.description}
                        </p>
                      </div>

                      {/* Decorative Circle */}
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Note */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-card text-center max-w-4xl mx-auto"
            >
              <span className="text-5xl block mb-4">🛡️</span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Safety is Our Priority
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                All our activities are designed with international safety standards. 
                Trained staff supervise every zone, and safety briefings are mandatory 
                for all visitors. Grip socks are provided free with every entry!
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Activities;
