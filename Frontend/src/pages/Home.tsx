import { Box } from '@mui/material';
import Hero from '../components/Hero';// Το κεντρικό banner με την CTA
import CoachProfile from './CoachProfile';
import GymSpace from './GymSpace';
import Tokens from './Tokens';
import Contact from '../pages/Contact'; // Το section με τη φόρμα/χάρτη

const Home = () => {
  return (
    <Box>
      {/* Section 1: Hero / Welcome */}
      <Box id="hero">
        <Hero />
      </Box>

      {/* Section 2: Ο Προπονητής */}
      <Box id="coach">
        <CoachProfile />
      </Box>

      {/* Section 3: Ο Χώρος (Gallery) */}
      <Box id="the-gym">
        <GymSpace />
      </Box>

      {/* Section 4: Tokens & Τιμές */}
      <Box id="tokens">
        <Tokens />
      </Box>

      {/* Section 5: Επικοινωνία */}
      <Box id="contact">
        <Contact />
      </Box>
    </Box>
  );
};

export default Home;