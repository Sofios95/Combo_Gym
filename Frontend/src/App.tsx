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
      {/* 1. Global CSS Overrides: Ensures the app looks consistent across all browsers */}
      <GlobalStyles
        styles={{
          "html, body": {
            margin: 0,
            padding: 0,
            width: "100%",
            maxWidth: "100vw",
            overflowX: "hidden", // Prevents annoying horizontal scrolling
            backgroundColor: "#000000", 
          },
          "#root": {
            width: "100%",
            overflowX: "hidden",
          },
          "*": {
            boxSizing: "border-box", // Essential for correct width/padding calculations
          },
        }}
      />

      {/* 2. Main Wrapper: Layout container using Flexbox */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Makes the app take at least the full height of the screen
          width: "100%",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <Navbar />

        {/* 3. Main Content Area: 'flexGrow: 1' pushes the footer to the bottom */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 4. Routing System: Matches the URL path to a specific Page Component */}
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