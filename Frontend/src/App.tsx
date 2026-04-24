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
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden", // <--- Αυτό εμποδίζει τα μαύρα κενά δεξιά
        position: "relative"
      }}
    >
      <Navbar />

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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