import { motion } from "framer-motion";
import { useRef } from "react";
import { activities } from "@/data/activities";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ActivitiesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="section-padding bg-muted relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-2 gradient-hero opacity-30" />
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-custom relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block text-4xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎢
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Exciting <span className="gradient-text">Activities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            16+ thrilling activities for all ages! From foam pits to wall climbing, 
            every visit is an unforgettable adventure.
          </p>
        </motion.div>

        {/* Slider Navigation */}
        <div className="flex justify-end gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Activities Slider */}
        <motion.div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="flex-shrink-0 w-72 snap-start"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-card">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                
                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between text-primary-foreground">
                  <motion.span
                    className="text-5xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring" }}
                  >
                    {activity.icon}
                  </motion.span>
                  
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {activity.description}
                    </p>
                  </div>

                  {/* Decorative Circle */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/activities">
            <Button
              size="lg"
              className="btn-bounce gradient-primary text-primary-foreground shadow-button"
            >
              View All Activities
              <ChevronRight className="ml-1 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
