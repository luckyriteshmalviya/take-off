import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  id: number;
  type: "image";
  src: string;
  title: string;
  category: string;
}

interface GalleryVideo {
  id: number;
  type: "video";
  thumbnail: string;
  videoUrl: string;
  title: string;
  category: string;
}

type GalleryItem = GalleryImage | GalleryVideo;

const galleryImages: GalleryImage[] = [
  { id: 1, type: "image", src: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800", title: "Trampoline Zone", category: "activities" },
  { id: 2, type: "image", src: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=800", title: "Foam Pit Fun", category: "activities" },
  { id: 3, type: "image", src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800", title: "Birthday Celebration", category: "events" },
  { id: 4, type: "image", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800", title: "Group Outing", category: "events" },
  { id: 5, type: "image", src: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800", title: "Wall Climbing", category: "activities" },
  { id: 6, type: "image", src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800", title: "Basketball Zone", category: "activities" },
  { id: 7, type: "image", src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800", title: "Kids Zone", category: "activities" },
  { id: 8, type: "image", src: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800", title: "Party Area", category: "events" },
  { id: 9, type: "image", src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800", title: "Active Fun", category: "activities" },
  { id: 10, type: "image", src: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800", title: "Bouncing Joy", category: "activities" },
  { id: 11, type: "image", src: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800", title: "Corporate Event", category: "events" },
  { id: 12, type: "image", src: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800", title: "Fun Time", category: "activities" },
];

const galleryVideos: GalleryVideo[] = [
  { id: 101, type: "video", thumbnail: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Park Overview", category: "videos" },
  { id: 102, type: "video", thumbnail: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Activities Highlight", category: "videos" },
  { id: 103, type: "video", thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Birthday Celebrations", category: "videos" },
];

const categories = ["all", "activities", "events", "videos"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const allItems: GalleryItem[] = [...galleryImages, ...galleryVideos];
  
  const filteredItems: GalleryItem[] = activeCategory === "all" 
    ? [...galleryImages, ...galleryVideos]
    : activeCategory === "videos"
    ? galleryVideos
    : galleryImages.filter(img => img.category === activeCategory);

  const getItemSrc = (item: GalleryItem) => {
    return item.type === "video" ? item.thumbnail : item.src;
  };

  const handlePrev = () => {
    if (selectedItem === null) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedItem === null) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex].id);
  };

  const selectedItemData = allItems.find(item => item.id === selectedItem);

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
            <div className="flex justify-center gap-3 flex-wrap">
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
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedItem(item.id)}
                    className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative"
                  >
                    <img
                      src={getItemSrc(item)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-primary-foreground font-medium text-sm">
                        {item.title}
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
          {selectedItem !== null && selectedItemData && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/90 backdrop-blur-sm z-50"
                onClick={() => setSelectedItem(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-4 md:inset-10 z-50 flex items-center justify-center"
              >
                <button
                  onClick={() => setSelectedItem(null)}
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

                <div className="bg-card rounded-3xl p-4 md:p-8 max-w-4xl w-full text-center">
                  {selectedItemData.type === "video" ? (
                    <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                      <iframe
                        src={selectedItemData.videoUrl}
                        title={selectedItemData.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                      <img
                        src={selectedItemData.src}
                        alt={selectedItemData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-heading font-bold">
                    {selectedItemData.title}
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
