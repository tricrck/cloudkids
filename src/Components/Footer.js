import React from 'react'
import { Typography, Container, Grid, Box } from '@mui/material'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    // <div style={{
    //   position: 'fixed',
    //   bottom: 0,
    //   left: 0,
    //   width: '100%',
    //   backgroundColor: '#333', // Adjust background color as needed
    //   color: '#fff', // Adjust text color as needed
    //   textAlign: 'center',
    //   padding: '10px 0',
    // }}>
    <div>
    <footer>
      <Box bgcolor="#17181a" color="white">
      <Container>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="body1" align="center">
              Address: Isaac Salat Road, P.O.BOX 207 - 20200, Kericho, Kenya
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="body1" align="center">
              Email: <Link href="mailto:info.nerdwaretechnologies@gmail.com">info.nerdwaretechnologies@gmail.com</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="body1" align="center">
              Phone: <Link href="tel:+254707263447">+254707263447</Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
              &copy; {new Date().getFullYear()} Nerdware Systems Technologies. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      </Box>
    </footer></div>
  )
}

export default Footer