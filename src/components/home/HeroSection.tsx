
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


      {/* START: Added Image Container */}
      <div
        className="absolute top-0 bottom-[80px] right-0 w-1/2 lg:w-2/5 xl:w-[45%]  // Position right, cover full height, adjust width
          bg-[url('https://www.innominds.com/hubfs/Innominds-201612/img/IM-News-and-Blogs/Innominds-Solution-for-Precision-Agriculture.jpg')]          // <-- **** REPLACE WITH YOUR IMAGE PATH ****
          bg-cover bg-center bg-no-repeat                   // Background image styling
          opacity-70                                        // Adjust opacity if needed (70% example)
          [mask-image:linear-gradient(to_left,black_30%,transparent_85%)] // The fade effect!
          [-webkit-mask-image:linear-gradient(to_left,black_30%,transparent_85%)] // Safari/Webkit fade
          pointer-events-none                               // Prevents image from blocking text interaction
          hidden md:block                                   // Hide on small screens, show on medium and up
        "
        aria-hidden="true" // Indicate it's decorative
      >
        {/* This div contains the image via background */}
      </div>
      {/* END: Added Image Container */}
      
      

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bo ld mb-4 animate-slide-in">
            Precision Farming with AI
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6 max-w-2xl animate-slide-in" style={{ animationDelay: "100ms" }}>
            Transform your land management with our cutting-edge AI technology.
            Get personalized crop recommendations based on your soil, climate, and farming history.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in" style={{ animationDelay: "200ms" }}>
            <Button size="lg" className="bg-farm-accent hover:bg-farm-accent/90 text-farm-dark font-medium" asChild>
              <Link to="/recommendation">Get Recommendations</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white border-2 text-white hover:bg-white hover:text-black bg-transparent font-medium" asChild>
              <Link to="/soil-data">Analyze Soil</Link>
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
}
