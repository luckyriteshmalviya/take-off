import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import spiderWebImg from "@/assets/spider-web.jpg";
import foamPitImg from "@/assets/foam-pit.jpg";
import ballPoolImg from "@/assets/ball-pool.jpg";

import Video_1 from "@/assets/videos/video_1.mp4"
import Video_2 from "@/assets/videos/video_2.mp4"
import Video_3 from "@/assets/videos/video_3.mp4"
import Video_4 from "@/assets/videos/video_4.mp4"
import Video_5 from "@/assets/videos/video_5.mp4"
import Video_6 from "@/assets/videos/video_6.mp4"


const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<{ src: string; type: 'image' | 'video'; alt?: string } | null>(null);

  const mediaItems = [
    { src: Video_1, type: 'video' as const, alt: "Trampoline Tricks" },
    { src: Video_2, type: 'video' as const, alt: "Kids Jumping Fun" },
    { src: Video_3, type: 'video' as const, alt: "Family Time at the Park" },
    { src: Video_4, type: 'video' as const, alt: "Group Activities" },
    { src: Video_5, type: 'video' as const, alt: "Park Highlights" },
    { src: Video_6, type: 'video' as const, alt: "Exciting Jumps" },
    { src: spiderWebImg, type: 'image' as const, alt: "Spider Web Activity" },
    { src: foamPitImg, type: 'image' as const, alt: "Foam Pit Jump" },
    { src: ballPoolImg, type: 'image' as const, alt: "Ball Pool Dodge Ball" },
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get a glimpse of the fun and excitement waiting for you at Take-off Trampoline Park
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer animate-fade-in-up hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedMedia(item)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={`${item.alt} - Take-off Trampoline Park Bhopal`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    muted
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="text-white ml-1" size={24} fill="white" />
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex items-center gap-2">
                  {/* {item.type === 'video' && <Play className="text-white" size={16} />} */}
                  <p className="text-white font-semibold text-lg">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>

        </div>
      </div>

      <Dialog open={selectedMedia !== null} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedMedia && (
            <div className="relative">
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.alt || "Gallery image"}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  className="w-full h-auto rounded-lg"
                  style={{ maxHeight: '70vh' }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;