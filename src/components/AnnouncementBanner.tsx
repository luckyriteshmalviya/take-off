import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

export const AnnouncementBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: banners = [] } = useQuery({
    queryKey: ["active-offers"],
    queryFn: async () => {
      const res = await fetch("/.netlify/functions/get-active-offers");
      const data = await res.json();
      return Array.isArray(data.banners) ? data.banners : [];
    },
    staleTime: 5 * 60 * 1000, // Browser caches data for 5 minutes without refetching
  });

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 text-white text-sm font-medium overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex justify-center text-center relative h-[20px] items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full"
            >
              <span className="font-bold tracking-wide">
                {banners[currentIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
