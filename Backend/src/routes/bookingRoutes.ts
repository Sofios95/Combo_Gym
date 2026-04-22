import { Router } from "express";
import { 
  createBooking, 
  cancelBooking, 
  getMyBookings // <--- Σιγουρέψου ότι έγινε import
} from "../controllers/bookingController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Διαδρομή για να κλείσει ο χρήστης θέση
router.post("/reserve/:id", authMiddleware, createBooking);

// Διαδρομή για να δει ο χρήστης τις κρατήσεις του (ΑΥΤΗ ΕΛΕΙΠΕ)
router.get("/my-bookings", authMiddleware, getMyBookings); 

// Διαδρομή για να ακυρώσει
router.delete("/cancel/:id", authMiddleware, cancelBooking);

export default router;