
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import { AuthProvider } from "./context/AuthContext";
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

// Import Auth related components
import { AuthProvider } from "./context/AuthContext"; // *** IMPORT AuthProvider ***
import ProtectedRoute from "./components/auth/ProtectedRoute"; // *** IMPORT ProtectedRoute ***

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* *** Wrap with AuthProvider if not done in main.tsx *** */}
      <AuthProvider>
        <Toaster />
        <Sonner />
        {/* BrowserRouter should ideally be outside AuthProvider if AuthProvider is here,
            or inside if AuthProvider is in main.tsx. Let's keep it simple for now. */}
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Routes Protected by Authentication */}
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
            <Route
              path="/soil-data"
              element={
                <ProtectedRoute>
                  <SoilData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/weather"
              element={
                <ProtectedRoute>
                  <Weather />
                </ProtectedRoute>
              }
            />

            {/* Catch-all Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>

  </QueryClientProvider>
);

export default App;