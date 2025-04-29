
import { saveUserContactSubmission } from "@/services/firebase/userService";
import { useAuth } from "@/context/AuthContext";

export const handleContactFormSubmit = async (
  name: string,
  email: string,
  message: string,
  onSuccess: () => void,
  onError: (error: any) => void
) => {
  try {
    // Create a contact submission object
    const contactSubmission = {
      name,
      email,
      message,
      timestamp: new Date().toLocaleString(),
    };
    
    // Try to get the current user
    const auth = useAuth();
    
    // If user is logged in, save to their profile
    if (auth.user) {
      await saveUserContactSubmission(contactSubmission);
    }
    
    // Continue with normal form submission
    onSuccess();
    
    return true;
  } catch (error) {
    console.error("Error saving contact submission:", error);
    onError(error);
    return false;
  }
};
