import React from 'react'
import { Typography, Container, Grid } from '@mui/material'

function About() {
  return (
    <Container className='conncs background0'>
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Typography variant="h3" align="center" gutterBottom>About Us</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align="center" paragraph>
          Nerdware Systems Technologies is dedicated to providing digital literacy and computer education to children in rural communities across Kenya.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Our mission is to empower children with the skills they need to succeed in the digital age, fostering innovation, creativity, and problem-solving abilities.
        </Typography>
      </Grid>
    </Grid>
  </Container>
  )
}

export default About