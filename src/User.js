import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

const User = () => {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [userId]);

  const handleIncrement = () => {
    if (userId < 10) {
      setUserId(prevId => prevId + 1);
    }
  };

  const handleDecrement = () => {
    if (userId > 1) {
      setUserId(prevId => prevId - 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            User Information
          </Typography>
          <Card sx={{ minHeight: '300px' }}>
            <CardContent sx={{ minHeight: '200px', textAlign: 'left' }}>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={1}>
                    <AccountCircleIcon />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1"><strong>Name:</strong></Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{userData.name}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <LanguageIcon />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1"><strong>Website:</strong></Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{userData.website}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <EmailIcon />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1"><strong>Email:</strong></Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      <a href={`mailto:${userData.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {userData.email}
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <PhoneIcon />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1"><strong>Phone:</strong></Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      <a href={`tel:${userData.phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {userData.phone}
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDecrement}
                disabled={userId === 1}
                fullWidth
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleIncrement}
                disabled={userId === 10}
                fullWidth
              >
                Next
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default User;
