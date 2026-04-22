import { Container, Typography, ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';

// itemData: Κράτα το ίδιο array που είχες
const itemData = [
  { img: '/training-img6.jpg', title: 'gym' },
  { img: '/training-img7.jpg', title: 'gym' },
  { img: '/training-img8.jpg', title: 'gym' },
  { img: '/training-img9.jpg', title: 'gym' },
  { img: '/training-img10.jpg', title: 'gym' },
  { img: '/training-img1.jpg', title: 'training' },
  { img: '/training-img2.jpg', title: 'training' },
  { img: '/training-img3.jpg', title: 'training' },
  { img: '/training-img4.jpg', title: 'training' },
  { img: '/training-img5.jpg', title: 'training' },
];

const Gallery = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const cols = isMobile ? 2 : 4;

  return (
    <Container id="gallery" maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ 
        fontWeight: 900, 
        mb: 6, 
        textTransform: 'uppercase', 
        textAlign: 'center',
        // Αντιγράφουμε το "Oswald/Condensed"Typography look
        letterSpacing: '1px' 
      }}>
        THE <span style={{ color: theme.palette.primary.main }}>ARENA</span>
      </Typography>
      
      <ImageList 
        variant="quilted" 
        cols={cols} 
        rowHeight={isMobile ? 200 : 280} 
        gap={12}
      >
        {itemData.map((item, index) => {
          // Λογική Quilted (Μόνο στο Desktop)
          const isLarge = !isMobile && (index === 0 || index === 6);
          const isWide = !isMobile && (index === 3);

          return (
            <ImageListItem 
              key={index} 
              cols={isLarge || isWide ? 2 : 1} 
              rows={isLarge ? 2 : 1}
              sx={{ 
                overflow: 'hidden', 
                borderRadius: '12px',
                // Εδώ αρχίζει η "Pro" hover logic
                '&:hover': {
                  cursor: 'pointer',
                  // Ανυψώνουμε το shadow για να φαίνεται premium
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  // Η "μαγεία" που επηρεάζει την εικόνα μέσα
                  '& img': {
                    transform: 'scale(1.05) rotate(1deg)', // Μικρό rotate για δυναμισμό
                  },
                  // Αν είχαμε overlay (θα το δούμε μετά), θα το εμφάνιζε εδώ
                }
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{ 
                  borderRadius: '12px', 
                  objectFit: 'cover', 
                  height: '100%', 
                  width: '100%',
                  border: '1px solid #333',
                  // Μια καθαρή, γρήγορη transition
                  transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)' 
                }}
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Container>
  );
};

export default Gallery;