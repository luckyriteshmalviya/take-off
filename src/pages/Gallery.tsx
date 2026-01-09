import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  { id: 1, emoji: "🎢", title: "Trampoline Zone", category: "activities" },
  { id: 2, emoji: "🧊", title: "Foam Pit Fun", category: "activities" },
  { id: 3, emoji: "🎂", title: "Birthday Celebration", category: "events" },
  { id: 4, emoji: "👥", title: "Group Outing", category: "events" },
  { id: 5, emoji: "🧗", title: "Wall Climbing", category: "activities" },
  { id: 6, emoji: "🏀", title: "Slam Dunk", category: "activities" },
  { id: 7, emoji: "👶", title: "Kids Zone", category: "activities" },
  { id: 8, emoji: "🎉", title: "Party Area", category: "events" },
  { id: 9, emoji: "🕸️", title: "Spider Web", category: "activities" },
  { id: 10, emoji: "🔮", title: "Body Zorbing", category: "activities" },
  { id: 11, emoji: "👔", title: "Corporate Event", category: "events" },
  { id: 12, emoji: "🌀", title: "Spiral Slide", category: "activities" },
];

const categories = ["all", "activities", "events"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const handlePrev = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <div className="container-custom relative text-center text-primary-foreground">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            >
              Gallery 📸
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
            >
              Glimpses of fun, laughter, and unforgettable moments at Take Off!
            </motion.p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 bg-background sticky top-16 z-30 border-b border-border">
          <div className="container-custom">
            <div className="flex justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`capitalize ${
                    activeCategory === category
                      ? "gradient-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(image.id)}
                    className="aspect-square bg-muted rounded-2xl overflow-hidden cursor-pointer group relative"
                  >
                    <div className="absolute inset-0 gradient-hero opacity-80 flex items-center justify-center">
                      <motion.span
                        className="text-6xl"
                        whileHover={{ scale: 1.2 }}
                      >
                        {image.emoji}
                      </motion.span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-primary-foreground font-medium text-sm">
                        {image.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/90 backdrop-blur-sm z-50"
                onClick={() => setSelectedImage(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-4 md:inset-10 z-50 flex items-center justify-center"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="bg-card rounded-3xl p-8 max-w-2xl w-full text-center">
                  <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center mb-6">
                    <div className="gradient-hero rounded-2xl w-full h-full flex items-center justify-center">
                      <motion.span
                        className="text-9xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {galleryImages.find(img => img.id === selectedImage)?.emoji}
                      </motion.span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    {galleryImages.find(img => img.id === selectedImage)?.title}
                  </h3>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
