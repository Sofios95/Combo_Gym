import Swal from 'sweetalert2';

// Create a customized SweetAlert2 instance with global configuration
export const BoxAlert = Swal.mixin({
  customClass: {
    popup: 'box-alert-popup',       // Inject custom CSS class for the alert container
    confirmButton: 'box-alert-button', // Inject custom CSS class for the action button
  },
  background: '#111',               // Set the global background color to match the dark theme
  color: '#fff',                    // Set global text color to white
  buttonsStyling: false,            // Disable default SweetAlert2 styles to enforce custom CSS classes
});

// Helper function to display a customized success alert
export const showSuccess = (title: string, text: string) => {
  BoxAlert.fire({
    icon: 'success',                // Set alert type to success (displays a checkmark animation)
    iconColor: '#d32f2f',           // Brand color for the icon (Red)
    // Use HTML template literals to enforce uppercase branding and inherit typography
    title: `<span style="font-family: inherit; font-weight: 900; text-transform: uppercase;">${title}</span>`,
    html: `<span style="color: #888;">${text}</span>`, // Muted gray text for the description
    confirmButtonText: 'OK / BACK TO WORK', // Boxing-themed action button text
  });
};

// Helper function to display a customized error alert
export const showError = (title: string, text: string) => {
  BoxAlert.fire({
    icon: 'error',                  // Set alert type to error (displays an "X" animation)
    iconColor: '#d32f2f',           // Same brand red icon color for consistency
    title: `<span style="font-family: inherit; font-weight: 900; text-transform: uppercase;">${title}</span>`,
    html: `<span style="color: #888;">${text}</span>`,
    confirmButtonText: 'TRY AGAIN', // Standard error retry text
  });
};