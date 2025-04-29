
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

// Import Pages
=======
import { AuthProvider } from "./context/AuthContext";
>>>>>>> parent of f5a65cf (Merge pull request #9 from KDS2383/kartik)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Recommendation from "./pages/Recommendation";
import Results from "./pages/Results";
import SoilData from "./pages/SoilData";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/account" element={<Account />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/results" element={<Results />} />
            <Route path="/soil-data" element={<SoilData />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
<<<<<<< HEAD

=======
>>>>>>> parent of f5a65cf (Merge pull request #9 from KDS2383/kartik)
