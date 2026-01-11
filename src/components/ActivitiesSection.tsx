import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { activities } from "@/data/activities";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SPEED = 20; // 🔥 faster (was 40)

const ActivitiesSection = () => {
  const controls = useAnimation();
  const [paused, setPaused] = useState(false);

  // Duplicate activities for seamless infinite loop
  const items = [...activities, ...activities];

  useEffect(() => {
    if (paused) return;

    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: SPEED,
          ease: "linear",
        },
      },
    });
  }, [paused, controls]);

  return (
    <section className="section-padding bg-muted relative overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute top-0 left-0 w-full h-2 gradient-hero opacity-30" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-4xl mb-4">🎢</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Exciting <span className="gradient-text">Activities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            High-energy attractions designed to keep you airborne and smiling.
          </p>
        </div>

        {/* Slider */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex gap-6 will-change-transform"
            animate={controls}
          >
            {items.map((activity, index) => (
              <motion.div
                key={`${activity.id}-${index}`}
                whileHover={{ y: -12 }}
                className="flex-shrink-0 w-72"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-card group cursor-pointer">
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-90 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between text-primary-foreground">
                    <span className="text-5xl">{activity.icon}</span>

                    <div>
                      <h3 className="text-xl font-heading font-bold mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {activity.description}
                      </p>
                    </div>

                    {/* Decorative orb */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/activities">
            <Button
              size="lg"
              className="btn-bounce gradient-primary shadow-button"
            >
              View All Activities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
