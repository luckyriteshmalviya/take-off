import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

/* -------------------- IMAGES -------------------- */
import package_one from "@/assets/Birthday_Package-2.jpeg";
import package_two from "@/assets/Birthday_Package.jpeg";
import package_three from "@/assets/Corporate_Package.jpeg";
import package_four from "@/assets/Corporate_Package-2.jpeg";
import package_gold from "@/assets/Gold_Package.jpeg";
import package_silver from "@/assets/Silver_Package.jpeg";

import canteen_menu from "@/assets/Menu.jpeg";
import canteen_one from "@/assets/restaurant-1.jpg";
import canteen_two from "@/assets/restaurant-2.jpg";
import canteen_three from "@/assets/restaurant-3.jpg";

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
import many_more from "@/assets/many-more.jpg"

/* -------------------- VIDEOS -------------------- */
import video1 from "@/assets/video_1.mp4";
import video2 from "@/assets/video_2.mp4";
import video3 from "@/assets/video_3.mp4";
import video4 from "@/assets/video_4.mp4";
import video5 from "@/assets/video_5.mp4";
import video6 from "@/assets/video_6.mp4";
import video7 from "@/assets/video_7.mp4";
import video8 from "@/assets/video_8.mp4";
import video9 from "@/assets/video_9.mp4";

import happy_customer_one from "@/assets/Happy_Customer_One.mp4";
import happy_customer_two from "@/assets/happy_customer_two.mp4";
import happy_customer_three from "@/assets/Happy_Customer_three.mp4";
import happy_customer_four from "@/assets/Happy_Customer_four.mp4";
import happy_customer_five from "@/assets/Happy_Customer_five.mp4";

/* -------------------- TYPES -------------------- */
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
  videoUrl: string;
  title: string;
  category: string;
}

type GalleryItem = GalleryImage | GalleryVideo;

/* -------------------- DATA -------------------- */
const galleryImages: GalleryImage[] = [
  { id: 1, type: "image", src: tramp2, title: "Jump Arena", category: "activities" },
  { id: 2, type: "image", src: tramp3, title: "Bouncing Fun", category: "activities" },
  { id: 3, type: "image", src: tramp6, title: "Air Tricks", category: "activities" },
  { id: 4, type: "image", src: tramp7, title: "Foam Pit Fun", category: "activities" },
  { id: 5, type: "image", src: tramp8, title: "Fun Zone", category: "activities" },
  { id: 6, type: "image", src: tramp9, title: "High Energy", category: "activities" },
  { id: 61, type: "image", src: many_more, title: "and Much More activities...", category: "activities" },

  { id: 7, type: "image", src: tramp4, title: "Birthday Celebration", category: "events" },
  { id: 8, type: "image", src: tramp5, title: "Party Area", category: "events" },
  { id: 9, type: "image", src: tramp10, title: "Corporate Event", category: "events" },
  { id: 10, type: "image", src: tramp11, title: "Corporate Meetup", category: "events" },
  
  { id: 15, type: "image", src: package_gold, title: "Gold Package", category: "packages" },
  { id: 16, type: "image", src: package_silver, title: "Silver Package", category: "packages" },
  { id: 11, type: "image", src: package_one, title: "Birthday Package", category: "packages" },
  { id: 12, type: "image", src: package_two, title: "Birthday Special", category: "packages" },
  { id: 13, type: "image", src: package_three, title: "Corporate Package", category: "packages" },
  { id: 14, type: "image", src: package_four, title: "Corporate Event Package", category: "packages" },
  { id: 17, type: "image", src: canteen_menu, title: "Menu Highlights", category: "canteen" },
  { id: 18, type: "image", src: canteen_one, title: "Dining Area", category: "canteen" },
  { id: 19, type: "image", src: canteen_two, title: "Restaurant Seating", category: "canteen" },
  { id: 20, type: "image", src: canteen_three, title: "Food Court", category: "canteen" },
];

const galleryVideos: GalleryVideo[] = [
  { id: 105, type: "video", videoUrl: video5, title: "Kids Zone", category: "videos" },
  { id: 101, type: "video", videoUrl: video1, title: "Park Overview", category: "videos" },
  { id: 102, type: "video", videoUrl: video2, title: "Jump Highlights", category: "videos" },
  { id: 103, type: "video", videoUrl: video3, title: "Obstacle Fun", category: "videos" },
  { id: 104, type: "video", videoUrl: video4, title: "Free Jump", category: "videos" },
  { id: 106, type: "video", videoUrl: video6, title: "Kids Fun", category: "videos" },
  { id: 107, type: "video", videoUrl: video7, title: "Adventure Time", category: "videos" },
  { id: 108, type: "video", videoUrl: video8, title: "Play Arena", category: "videos" },
  { id: 109, type: "video", videoUrl: video9, title: "Exciting Moments", category: "videos" },
  { id: 201, type: "video", videoUrl: happy_customer_one, title: "Happy Customer", category: "happy customer" },
  { id: 202, type: "video", videoUrl: happy_customer_two, title: "Customer Review", category: "happy customer" },
  { id: 203, type: "video", videoUrl: happy_customer_three, title: "Fun Experience", category: "happy customer" },
  { id: 204, type: "video", videoUrl: happy_customer_four, title: "Great Party", category: "happy customer" },
  { id: 205, type: "video", videoUrl: happy_customer_five, title: "Teens Love It", category: "happy customer" },
];

const categories = ["all", "activities", "events", "packages", "canteen", "videos", "happy customer"];

/* -------------------- HOVER VIDEO -------------------- */
const HoverVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.muted = true;
      video.currentTime = 0;
      await video.play();
    } catch {}
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <div className="w-full h-full relative" onMouseEnter={playVideo} onMouseLeave={stopVideo}>
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        muted
        preload="auto"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Play className="w-10 h-10 text-white opacity-80 group-hover:opacity-0 transition" />
      </div>
    </div>
  );
};

/* -------------------- COMPONENT -------------------- */
const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const allItems: GalleryItem[] = [...galleryImages, ...galleryVideos];
  const filteredItems =
    activeCategory === "all" ? allItems : allItems.filter((i) => i.category === activeCategory);
  const selectedItemData = allItems.find((i) => i.id === selectedItem);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-black text-center text-white">
          <h1 className="text-5xl font-bold">Gallery 📸</h1>
          <p className="mt-4 text-lg opacity-80">Glimpses of fun and unforgettable moments at Take Off!</p>
        </section>

        <section className="py-8 sticky top-16 bg-background z-30 border-b">
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} onClick={() => setActiveCategory(cat)} className="capitalize">
                {cat}
              </Button>
            ))}
          </div>
        </section>

        <section className="px-6 pb-16 pt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300" onClick={() => setSelectedItem(item.id)}>
              <div className="aspect-[4/3] w-full bg-muted">
                {item.type === "image" ? (
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                ) : (
                  <HoverVideo src={item.videoUrl} />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-2 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                {item.title}
              </div>
            </div>
          ))}
        </section>

        <AnimatePresence>
          {selectedItemData && (
            <motion.div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="relative w-full max-w-4xl">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute -top-12 right-0 bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:scale-110 transition z-50"
                >
                  <X className="w-6 h-6 text-black" />
                </button>

                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                  {selectedItemData.type === "video" ? (
                    <video src={selectedItemData.videoUrl} controls autoPlay className="w-full max-h-[75vh]" />
                  ) : (
                    <img src={selectedItemData.src} className="w-full max-h-[75vh] object-contain" />
                  )}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-center text-white">{selectedItemData.title}</h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
