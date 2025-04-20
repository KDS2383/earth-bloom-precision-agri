
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { InfoGraphic } from "@/components/home/InfoGraphic";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="section-divider" />
      
      <FeaturesSection />
      
      <TestimonialsSection />
      
      <InfoGraphic />
      
      <section className="py-20 bg-farm-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Optimize Your Farm?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get personalized crop recommendations based on your unique farming conditions.
          </p>
          <Button size="lg" className="bg-farm-accent hover:bg-farm-accent/90 text-farm-dark font-medium" asChild>
            <Link to="/recommendation">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
