import { motion } from "framer-motion";
import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";

const RestaurantSection = () => {
  const images = [
    { src: restaurant1, alt: "Party area with balloon decorations" },
    { src: restaurant2, alt: "Birthday celebration setup" },
    { src: restaurant3, alt: "Restaurant and seating area" },
  ];

  return (
    <section className="section-padding bg-muted relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />

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
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🍽️
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Restaurant & <span className="gradient-text">Party Area</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrate birthdays, host kitty parties, or simply enjoy delicious food 
            in our spacious restaurant and party area!
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { icon: "🎂", label: "Birthday Parties" },
            { icon: "👯", label: "Kitty Parties" },
            { icon: "🍕", label: "Delicious Food" },
            { icon: "🎈", label: "Decorations" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl p-4 text-center shadow-sm"
            >
              <span className="text-3xl block mb-2">{item.icon}</span>
              <p className="font-medium text-sm text-foreground">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RestaurantSection;
