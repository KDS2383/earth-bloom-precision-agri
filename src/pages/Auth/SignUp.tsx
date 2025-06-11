import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { Checkbox } from "@/components/ui/checkbox";

// --- START: CHANGES ---
// 1. Import the Firebase function for creating users
import { createUserWithEmailAndPassword } from "firebase/auth";
// 2. Import your Firebase auth instance (same as in SignIn.tsx)
import { auth } from "@/firebase"; 
// --- END: CHANGES ---

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      acceptTerms: checked
    }));
  };

  // --- START: UPDATED handleSubmit FUNCTION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.acceptTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please accept the terms and conditions.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Use Firebase to create the user with email and password
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Note: You can also update the user's profile with their name here
      // if you want. See the optional step below.
      
      toast({
        title: "Account created successfully",
        description: "Welcome to EarthBloom! You can now sign in with your new account.",
      });
      navigate('/signin');
    } catch (error: any) {
      // Firebase will provide specific error messages
      // (e.g., email already in use, weak password)
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  // --- END: UPDATED handleSubmit FUNCTION ---

  return (
    <Layout>
      <section className="py-12 bg-farm-cream">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
                <CardDescription className="text-center">
                  Create your account to get started with EarthBloom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* ... The rest of your form JSX remains the same ... */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm">
                      I accept the{" "}
                      <Link to="/terms" className="text-farm-primary hover:underline">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-farm-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-farm-primary hover:bg-farm-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
                
                {/* ... The rest of your component remains the same ... */}
              </CardContent>
              {/* ... */}
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;