
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-farm-accent/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-farm-accent/10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-in">
            Precision Farming with AI
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6 max-w-2xl animate-slide-in" style={{animationDelay: "100ms"}}>
            Transform your land management with our cutting-edge AI technology. 
            Get personalized crop recommendations based on your soil, climate, and farming history.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in" style={{animationDelay: "200ms"}}>
            <Button size="lg" className="bg-farm-accent hover:bg-farm-accent/90 text-farm-dark font-medium" asChild>
              <Link to="/recommendation">Get Recommendations</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/soil-data">Analyze Soil</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
