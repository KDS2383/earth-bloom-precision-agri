// earth-bloom-precision-agri/src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// --- START: Import the ProtectedRoute ---
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
// --- END: Import the ProtectedRoute ---

// Import Pages
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
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Index />} />
          <Route path="/soil-data" element={<SoilData />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* --- Protected Routes --- */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendation"
            element={
              <ProtectedRoute>
                <Recommendation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />

          {/* --- Not Found Route --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;