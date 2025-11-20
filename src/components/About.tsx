import { Heart, Shield, Users, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Pure Fun",
      description: "Designed for maximum enjoyment and memorable experiences for everyone",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Trained staff and high-quality equipment ensure a safe environment",
    },
    {
      icon: Users,
      title: "For All Ages",
      description: "Activities suitable for kids, teens, and adults alike",
    },
    {
      icon: Sparkles,
      title: "Modern Facility",
      description: "State-of-the-art trampoline park with diverse exciting activities",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary">Take-off</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Located in Misrod, Bhopal, Take-off Trampoline Park is your destination for high-flying fun and adventure. 
            We offer a wide range of exciting activities in a safe, modern facility that brings joy to families and friends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-2 border-border bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 border-2 border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Adventure Awaits!
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're planning a birthday party, a family outing, or just looking for some active fun, 
              Take-off Trampoline Park offers an unforgettable experience for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;