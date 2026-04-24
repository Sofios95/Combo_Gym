import { Box } from '@mui/material';
import Hero from '../components/Hero';
import CoachProfile from './CoachProfile';
import GymSpace from './GymSpace';
import Tokens from './Tokens';
import Contact from '../pages/Contact';

const Home = () => {
  return (
    // Προσθέτουμε overflowX: 'hidden' για να "κόβεται" οτιδήποτε εξέχει
    // και minHeight για να μην κουνιέται το footer
    <Box sx={{ width: '100%', overflowX: 'hidden', minHeight: '100vh' }}>
      
      {/* Section 1: Hero */}
      <Box id="hero" component="section">
        <Hero />
      </Box>

      {/* Section 2: Ο Προπονητής */}
      <Box id="coach" component="section">
        <CoachProfile />
      </Box>

      {/* Section 3: Ο Χώρος (Gallery) */}
      <Box id="the-gym" component="section">
        <GymSpace />
      </Box>

      {/* Section 4: Tokens & Τιμές */}
      <Box id="tokens" component="section">
        <Tokens />
      </Box>

      {/* Section 5: Επικοινωνία */}
      <Box id="contact" component="section">
        <Contact />
      </Box>
      
    </Box>
  );
};

export default Home;