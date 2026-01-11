import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import trampoline1 from "@/assets/restaurant-1.jpg";
import tramp2 from "@/assets/tram-2.jpg";
import tramp3 from "@/assets/tramp-3.jpg";
import tramp4 from "@/assets/tramp-4.jpg";
import tramp5 from "@/assets/tramp-5.jpg";
import tramp6 from "@/assets/tramp-6.jpg";
import tramp7 from "@/assets/tramp-7.jpg";
import tramp8 from "@/assets/tramp-8.jpg";
import tramp9 from "@/assets/tramp-9.jpg";
import tramp10 from "@/assets/tramp-10.jpg";
import tramp11 from "@/assets/tramp-11.jpg";
import thumbnail from "@/assets/thumbnail.jpg";
import video1 from "@/assets/video_1.mp4";
import video2 from "@/assets/video_2.mp4";
import video3 from "@/assets/video_3.mp4";
import video4 from "@/assets/video_4.mp4";
import video5 from "@/assets/video_5.mp4";
import video6 from "@/assets/video_6.mp4";
import video7 from "@/assets/video_7.mp4";




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
  { id: 1, type: "image", src: trampoline1, title: "Restaurant", category: "events" },
  { id: 2, type: "image", src: tramp2, title: "Fun", category: "activities" },
  { id: 3, type: "image", src: tramp3, title: "activity", category: "events" },
  { id: 4, type: "image", src: tramp4, title: "Birthday Celebration", category: "events" },
  { id: 5, type: "image", src: tramp6, title: "Parties", category: "activities" },
  { id: 6, type: "image", src: tramp7, title: "", category: "activities" },
  { id: 7, type: "image", src: tramp8, title: "Fun Zone", category: "activities" },
  { id: 8, type: "image", src: tramp5, title: "Party Area", category: "events" },
  { id: 9, type: "image", src: tramp9, title: "Active Fun", category: "activities" },
  { id: 10, type: "image", src: tramp3, title: "Bouncing Joy", category: "activities" },
  { id: 11, type: "image", src: tramp10, title: "Corporate Event", category: "events" },
  { id: 12, type: "image", src: tramp11, title: "Fun Time", category: "activities" },
];

const galleryVideos: GalleryVideo[] = [
  { id: 101, type: "video", thumbnail: thumbnail, videoUrl: video1, title: "Park Overview", category: "videos" },
  { id: 102, type: "video", thumbnail: thumbnail, videoUrl: video2, title: "Activities Highlight", category: "videos" },
  { id: 103, type: "video", thumbnail: thumbnail, videoUrl: video3, title: "Activities Highlight", category: "videos" },
  { id: 104, type: "video", thumbnail: thumbnail, videoUrl: video4, title: "Activities Highlight", category: "videos" },
  { id: 105, type: "video", thumbnail: thumbnail, videoUrl: video5, title: "Activities Highlight", category: "videos" },
  { id: 106, type: "video", thumbnail: thumbnail, videoUrl: video6, title: "Activities Highlight", category: "videos" },
  { id: 107, type: "video", thumbnail: thumbnail, videoUrl: video7, title: "Activities Highlight", category: "videos" },
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
        <section className="pt-32 pb-20 relative overflow-hidden bg-black">
          <div className="container-custom relative text-center text-primary-foreground">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl  md:text-5xl lg:text-6xl font-heading font-bold mb-6"
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
