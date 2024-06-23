import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';

const App = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    
    axios.get('https://api.tvmaze.com/shows')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <Container>
      <h1>TV Shows</h1>
      <Grid container spacing={4}>
        {shows.map(show => (
          <Grid item key={show.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={show.image ? show.image.medium : 'https://via.placeholder.com/210x295'}
                alt={show.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {show.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No description available.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;