
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Organic Farmer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    quote: "The crop recommendations were spot-on for my soil type. I've seen a 40% increase in yield since implementing the suggestions from EarthBloom."
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Commercial Grower",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    quote: "The soil analysis data provided insights I never had before. It helped me make targeted adjustments that improved my crop health significantly."
  },
  {
    id: 3,
    name: "Sarah Thompson",
    role: "Family Farm Owner",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    quote: "As a new farmer, I was overwhelmed with decisions. EarthBloom simplified everything with clear recommendations based on my specific location."
  },
  {
    id: 4,
    name: "David Chen",
    role: "Agricultural Researcher",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    quote: "The integration of weather data with crop recommendations creates a powerful tool for modern farming. I recommend it to all my colleagues."
  }
];

export function TestimonialsSection() {
  const [activeTestimonials, setActiveTestimonials] = useState([0, 1, 2]);
  const isMobile = window.innerWidth < 768;
  
  const handlePrev = () => {
    setActiveTestimonials(prev => {
      const first = prev[0];
      return first === 0 
        ? [testimonials.length - 1, ...prev.slice(0, 2)] 
        : [first - 1, ...prev.slice(0, 2)];
    });
  };
  
  const handleNext = () => {
    setActiveTestimonials(prev => {
      const last = prev[prev.length - 1];
      return last === testimonials.length - 1 
        ? [...prev.slice(1), 0]
        : [...prev.slice(1), last + 1];
    });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
            What Farmers Are Saying
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Success stories from farmers who have transformed their yields with our precision farming approach
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
            {activeTestimonials.map((index) => (
              <Card key={testimonials[index].id} className="w-full md:w-1/3 farm-card border-farm-light">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={testimonials[index].image} alt={testimonials[index].name} />
                    <AvatarFallback className="bg-farm-primary text-white text-xl">
                      {testimonials[index].name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <blockquote className="text-gray-600 mb-4 italic">
                    "{testimonials[index].quote}"
                  </blockquote>
                  <div className="mt-auto">
                    <div className="font-semibold">{testimonials[index].name}</div>
                    <div className="text-sm text-gray-500">{testimonials[index].role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev}
              className="rounded-full border-farm-primary text-farm-primary hover:bg-farm-primary hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <span className="sr-only">Previous</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext}
              className="rounded-full border-farm-primary text-farm-primary hover:bg-farm-primary hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m9 18 6-6-6-6"/>
              </svg>
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
