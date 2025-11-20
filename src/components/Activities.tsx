import { Card } from "@/components/ui/card";
import spiderWebImg from "@/assets/spider-web.jpg";
import velcroWallImg from "@/assets/velcro-wall.jpg";
import foamPitImg from "@/assets/foam-pit.jpg";
import ballPoolImg from "@/assets/ball-pool.jpg";
import slideImg from "@/assets/slide.jpg";

const Activities = () => {
  const activities = [
    {
      title: "Spider Web",
      description: "Climb through our exciting spider web structure, testing your agility and balance in this colorful maze",
      image: spiderWebImg,
      color: "from-primary to-primary/80",
    },
    {
      title: "Velcro Wall",
      description: "Suit up and stick! Jump onto our velcro wall and see how high you can reach in this hilarious activity",
      image: velcroWallImg,
      color: "from-secondary to-secondary/80",
    },
    {
      title: "Foam Pit",
      description: "Take the leap into our massive foam pit filled with soft cubes for a safe and thrilling landing",
      image: foamPitImg,
      color: "from-bounce-yellow to-bounce-yellow/80",
    },
    {
      title: "Ball Pool Dodge Ball",
      description: "Battle it out in our colorful ball pool arena - dodge, dive, and throw in this action-packed game",
      image: ballPoolImg,
      color: "from-bounce-pink to-bounce-pink/80",
    },
    {
      title: "Slide",
      description: "Zoom down our exciting slides for a rush of adrenaline and endless fun for all ages",
      image: slideImg,
      color: "from-primary to-secondary",
    },
  ];

  return (
    <section id="activities" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Activities</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience 5 amazing activities designed to get your heart pumping and create unforgettable memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in-up border-0"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={activity.image}
                  alt={`${activity.title} - Fun activity at Take-off Trampoline Park Bhopal`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${activity.color} opacity-40 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-foreground">{index + 1}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            All activities are supervised by trained staff to ensure maximum safety and fun!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Activities;