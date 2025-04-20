
import { Cloud, Map, User } from "lucide-react";

const features = [
  {
    title: "AI-Powered Recommendations",
    description:
      "Our sophisticated AI analyzes multiple factors to recommend the optimal crops for your unique farming conditions.",
    icon: <User className="h-12 w-12 text-farm-primary" />,
  },
  {
    title: "Soil Analysis",
    description:
      "Get detailed insights into your soil composition, nutrients, and characteristics to make data-driven farming decisions.",
    icon: <Map className="h-12 w-12 text-farm-primary" />,
  },
  {
    title: "Weather Integration",
    description:
      "Access historical weather patterns and forecasts to plan your farming activities with confidence.",
    icon: <Cloud className="h-12 w-12 text-farm-primary" />,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-farm-cream">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
            Smart Farming Solutions
          </h2>
          <p className="text-lg text-farm-brown max-w-2xl mx-auto">
            Our platform integrates advanced technology with agricultural expertise
            to optimize your farming operations and maximize yields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="farm-card flex flex-col items-center text-center p-8"
            >
              <div className="mb-6 p-4 bg-farm-light rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-farm-primary">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
