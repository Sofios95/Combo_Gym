import Swal from 'sweetalert2';

export const BoxAlert = Swal.mixin({
  customClass: {
    popup: 'box-alert-popup',
    confirmButton: 'box-alert-button',
  },
  background: '#111', // Το μαύρο του site σου
  color: '#fff',
  buttonsStyling: false, // Απενεργοποιούμε τα default για να βάλουμε τα δικά μας
});

// Helper για επιτυχία
export const showSuccess = (title: string, text: string) => {
  BoxAlert.fire({
    icon: 'success',
    iconColor: '#d32f2f', // Το κόκκινο της επιτυχίας/brand
    title: `<span style="font-family: inherit; font-weight: 900; text-transform: uppercase;">${title}</span>`,
    html: `<span style="color: #888;">${text}</span>`,
    confirmButtonText: 'OK / BACK TO WORK',
  });
};

// Helper για σφάλμα
export const showError = (title: string, text: string) => {
  BoxAlert.fire({
    icon: 'error',
    iconColor: '#d32f2f',
    title: `<span style="font-family: inherit; font-weight: 900; text-transform: uppercase;">${title}</span>`,
    html: `<span style="color: #888;">${text}</span>`,
    confirmButtonText: 'TRY AGAIN',
  });
};