import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import spiderWebImg from "@/assets/spider-web.jpg";
import velcroWallImg from "@/assets/velcro-wall.jpg";
import foamPitImg from "@/assets/foam-pit.jpg";
import ballPoolImg from "@/assets/ball-pool.jpg";
import slideImg from "@/assets/slide.jpg";
import heroImage from "@/assets/hero-trampoline.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: heroImage, alt: "Trampoline Park Overview" },
    { src: spiderWebImg, alt: "Spider Web Activity" },
    { src: velcroWallImg, alt: "Velcro Wall Fun" },
    { src: foamPitImg, alt: "Foam Pit Jump" },
    { src: ballPoolImg, alt: "Ball Pool Dodge Ball" },
    { src: slideImg, alt: "Exciting Slide" },
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
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer animate-fade-in-up hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={`${image.alt} - Take-off Trampoline Park Bhopal`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-lg">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery image"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;