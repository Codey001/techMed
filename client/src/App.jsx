import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box, Container, CssBaseline } from '@mui/material';


const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Navbar />
      <Container component="main" sx={{ flex: 1 }}>
        <div>
          this is your profile page
        </div>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
