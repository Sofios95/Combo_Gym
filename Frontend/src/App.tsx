import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";      // <--- Προσθήκη
import Register from "./pages/Register"; // <--- Προσθήκη
import MyBookings from "./pages/MyBooking";
// Τα παρακάτω τα κρατάμε ως Routes μόνο αν θέλουμε 
// να είναι προσβάσιμα ΚΑΙ ως αυτόνομες σελίδες.
import CoachProfile from "./pages/CoachProfile";
import GymSpace from "./pages/GymSpace";
import Tokens from "./pages/Tokens";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          {/* Η Αρχική που πλέον περιέχει τα πάντα (Hero, Coach, Tokens κλπ) */}
          <Route path="/" element={<Home />} />
          
          {/* Σελίδες που θέλουμε να φαίνονται "μόνες" τους */}
          <Route path="/book" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Αν κάποιος πληκτρολογήσει απευθείας το URL, θα τον βγάλει στη σελίδα */}
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/coach" element={<CoachProfile />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/the-gym" element={<GymSpace />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}

export default App;