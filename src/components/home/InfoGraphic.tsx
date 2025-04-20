
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Input Your Farm Data",
    description: "Provide information about your farm location, soil type, and farming history.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "AI Analysis",
    description: "Our AI processes your data, analyzing soil composition, weather patterns, and historic crop performance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
        <path d="M22 12A10 10 0 0 0 12 2v10z"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Generate Recommendations",
    description: "The system identifies optimal crops based on your specific conditions and sustainability goals.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Review Detailed Report",
    description: "Access comprehensive insights including soil data, weather impacts, and expected yields for recommended crops.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    )
  },
];

export function InfoGraphic() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple process delivers powerful insights for your farm
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Steps visualization */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-farm-light z-0"></div>
              {steps.map((step) => (
                <div key={step.id} className="relative z-10 mb-12">
                  <div className="flex items-start">
                    <div 
                      className={cn(
                        "flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300",
                        activeStep === step.id 
                          ? "bg-farm-primary text-white scale-110" 
                          : "bg-farm-light text-farm-primary"
                      )}
                      onClick={() => setActiveStep(step.id)}
                    >
                      {step.icon}
                    </div>
                    
                    <div className="ml-6">
                      <h3 
                        className={cn(
                          "font-semibold text-lg mb-2 transition-colors duration-300",
                          activeStep === step.id 
                            ? "text-farm-primary" 
                            : "text-gray-700"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className={cn(
                          "text-gray-600 transition-opacity duration-300",
                          activeStep === step.id 
                            ? "opacity-100" 
                            : "opacity-70"
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual illustration */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square bg-farm-cream rounded-2xl overflow-hidden shadow-lg">
              {/* This is a placeholder for a more complex animation/illustration */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className={cn(
                  "transform transition-all duration-500",
                  activeStep === 1 && "translate-y-0 opacity-100",
                  activeStep !== 1 && "translate-y-10 opacity-0 absolute"
                )}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-farm-primary mb-4">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                  <h4 className="text-xl font-semibold text-farm-dark mb-2">Farm Information</h4>
                </div>
                
                <div className={cn(
                  "transform transition-all duration-500",
                  activeStep === 2 && "translate-y-0 opacity-100",
                  activeStep !== 2 && "translate-y-10 opacity-0 absolute"
                )}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-farm-primary mb-4">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                  </svg>
                  <h4 className="text-xl font-semibold text-farm-dark mb-2">AI Processing</h4>
                </div>
                
                <div className={cn(
                  "transform transition-all duration-500",
                  activeStep === 3 && "translate-y-0 opacity-100",
                  activeStep !== 3 && "translate-y-10 opacity-0 absolute"
                )}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-farm-primary mb-4">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <h4 className="text-xl font-semibold text-farm-dark mb-2">Smart Recommendations</h4>
                </div>
                
                <div className={cn(
                  "transform transition-all duration-500",
                  activeStep === 4 && "translate-y-0 opacity-100",
                  activeStep !== 4 && "translate-y-10 opacity-0 absolute"
                )}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-farm-primary mb-4">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  <h4 className="text-xl font-semibold text-farm-dark mb-2">Detailed Reports</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Button size="lg" className="bg-farm-primary hover:bg-farm-dark" asChild>
            <a href="/recommendation">Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
