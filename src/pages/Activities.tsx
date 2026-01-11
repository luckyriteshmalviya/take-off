import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { activities } from "@/data/activities";

const Activities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section – Take Off Theme */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-black">
          {/* Soft glow */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Floating energy */}
          <motion.div
            className="absolute top-24 right-16 text-8xl "
            animate={{ y: [0, -20, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🚀
          </motion.div>

          <div className="container-custom relative text-center text-primary-foreground">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            >
              Our Activities
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
            >
              16+ high-energy attractions designed to make you jump higher, fly longer,
              and land smiling at Take Off Trampoline Park.
            </motion.p>
          </div>
        </section>

        {/* Activities Grid (unchanged) */}
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
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-card">
                    <img
                      src={activity.image}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${activity.color} hover:bg-transparent opacity-70 group-hover:opacity-80 transition-opacity`}
                    />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-primary-foreground">
                      <span className="text-5xl">{activity.icon}</span>

                      <div>
                        <h3 className="text-xl font-heading font-bold mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-sm opacity-90 line-clamp-3">
                          {activity.description}
                        </p>
                      </div>

                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Note (unchanged) */}
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
                All activities follow international safety standards with trained
                staff supervision and complimentary grip socks for every guest.
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
