import { Routes, Route } from "react-router-dom";
import { Box, GlobalStyles } from "@mui/material"; // Προσθήκη GlobalStyles
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBooking";
import CoachProfile from "./pages/CoachProfile";
import GymSpace from "./pages/GymSpace";
import Tokens from "./pages/Tokens";
import './index.css';

function App() {
  return (
    <>
      {/* 🛡️ Η "Ασπίδα" κατά του οριζόντιου scroll */}
      <GlobalStyles
        styles={{
          "html, body": {
            margin: 0,
            padding: 0,
            width: "100%",
            maxWidth: "100vw",
            overflowX: "hidden", // Κλειδώνει το πλάτος
            backgroundColor: "#000000", // Σιγουρεύουμε το μαύρο φόντο παντού
          },
          "#root": {
            width: "100%",
            overflowX: "hidden",
          },
          "*": {
            boxSizing: "border-box", // Σωστός υπολογισμός paddings
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden", // Διπλή ασφάλεια
          position: "relative",
        }}
      >
        <Navbar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
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
    </>
  );
}

export default App;