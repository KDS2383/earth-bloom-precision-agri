// src/pages/Auth/SignIn.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; // Removed GoogleAuthProvider as it's in firebase.ts
import { auth, provider } from "@/firebase"; // Import auth and provider

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // Separate loading state for Google
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null); // Optional: for specific error message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast({
        title: "Signed in successfully",
        description: "Welcome back to EarthBloom!",
        // variant: 'success' // Optional: if you have a success variant
      });
      navigate('/'); // Redirect to home or dashboard
    } catch (error: any) {
      console.error("Sign in error:", error);
       let errorMessage = "Please check your email and password and try again.";
       // Provide more specific feedback
       if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
         errorMessage = "Invalid email or password.";
       } else if (error.code === 'auth/invalid-email') {
         errorMessage = "Please enter a valid email address.";
       } else if (error.code === 'auth/too-many-requests') {
         errorMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.";
       }
      setError(errorMessage);
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, provider); // Use the imported provider
      toast({
        title: "Signed in successfully with Google",
        description: "Welcome back to EarthBloom!",
         // variant: 'success' // Optional
      });
      navigate('/'); // Redirect to home or dashboard
    } catch (error: any) {
      console.error("Google sign in error:", error);
      let errorMessage = "An error occurred during Google sign in. Please try again.";
      // Handle specific Google Sign-In errors if needed
      if (error.code === 'auth/popup-closed-by-user') {
          errorMessage = "Google Sign-In cancelled.";
      } else if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-blocked') {
          errorMessage = "Popup blocked or cancelled. Please allow popups for this site.";
      } else if (error.code === 'auth/account-exists-with-different-credential') {
          errorMessage = "An account already exists with this email using a different sign-in method.";
      }
       setError(errorMessage);
      toast({
        title: "Google sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-12 bg-farm-cream"> {/* Use your actual background color class */}
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Input fields remain the same */}
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
                       aria-describedby={error ? "error-message" : undefined}
                     />
                   </div>
                   <div className="space-y-2">
                     <div className="flex items-center justify-between">
                       <Label htmlFor="password">Password</Label>
                       <Link
                         to="/forgot-password" // Make sure this route exists
                         className="text-sm text-farm-primary hover:underline" // Use your actual color
                       >
                         Forgot password?
                       </Link>
                     </div>
                     <Input
                       id="password"
                       name="password"
                       type="password"
                       placeholder="••••••••"
                       value={formData.password}
                       onChange={handleChange}
                       required
                       aria-describedby={error ? "error-message" : undefined}
                     />
                   </div>

                    {/* Display error message */}
                   {error && (
                      <p id="error-message" className="text-sm text-destructive">{error}</p>
                   )}

                  <Button
                    type="submit"
                    className="w-full bg-farm-primary hover:bg-farm-dark" // Use your actual colors
                    disabled={isLoading || isGoogleLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                {/* OR Separator */}
                 <div className="mt-4 flex items-center">
                   <div className="flex-grow border-t border-gray-300"></div>
                   <span className="flex-shrink mx-4 text-xs text-muted-foreground">OR</span>
                   <div className="flex-grow border-t border-gray-300"></div>
                 </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"> {/* Adjust grid for responsiveness */}
                  <Button
                     variant="outline"
                     type="button"
                     className="w-full"
                     onClick={handleGoogleSignIn}
                     disabled={isLoading || isGoogleLoading}
                   >
                     {isGoogleLoading ? (
                       <>
                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Signing in...
                       </>
                     ) : (
                       <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 24 24"> {/* Google Icon */}
                           <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /> <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /> <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /> <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                         </svg>
                        Google
                       </>
                     )}
                   </Button>
                   {/* Optional: GitHub Button - Implement similar logic if needed */}
                  <Button variant="outline" type="button" className="w-full" disabled>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24"> {/* GitHub Icon */}
                      <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="justify-center pt-4"> {/* Adjusted padding */}
                <div className="text-sm text-muted-foreground"> {/* Use muted text color */}
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-medium text-farm-primary hover:underline"> {/* Use your actual color */}
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignIn;