
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Check if this is a processing toast (loading variant)
        const isProcessing = variant === 'loading';
        
        return (
          <Toast 
            key={id} 
            {...props} 
            variant={variant} 
            className={`group ${isProcessing ? 'process-toast' : ''}`}
            // Center process toasts
            style={isProcessing ? {
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '500px', 
              zIndex: 1000,
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)'
            } : undefined}
          >
            <div className="grid gap-1">
              {title && <ToastTitle className={isProcessing ? "text-lg font-bold" : ""}>{title}</ToastTitle>}
              {description && (
                <ToastDescription className={isProcessing ? "text-base" : ""}>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
