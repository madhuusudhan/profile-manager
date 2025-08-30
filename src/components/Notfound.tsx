import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h1">404</Typography>
          <Typography variant="h6">
            The page you’re looking for doesn’t exist.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/profile-form')}
          >
            Back Home
          </Button>
          <Box
            component="img"
            src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
            alt=""
            sx={{ width: 500, height: 250, mt: 2 }}
          />
        </Box>
      </Container>
    </Box>
  );
}
