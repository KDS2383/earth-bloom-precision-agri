
import { saveUserContactSubmission } from "@/services/firebase/userService";
import { auth } from "@/firebase";
import { User } from "firebase/auth";

export const handleContactFormSubmit = async (
  name: string,
  email: string,
  message: string,
  currentUser: User | null,
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
    
    // If user is logged in, save to their profile
    if (currentUser) {
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
