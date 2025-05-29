import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Container, Grid, Button } from '@mui/material'
import Donate from '../Components/Donate';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [fadeAnimation, setFadeAnimation] = useState(false);

  // State to manage modal open/close
  const handleOpenModal = () => {
    setOpenModal(true); // Function to open the modal
  };

  const images = [
    require('../Images/image1.png'),
    require('../Images/image2.jpeg'),
    require('../Images/image3.jpeg'),
    require('../Images/image4.jpeg')
  ];

  const captions = [
    `Knowledge is not just preserved for the elite.`,
    `Let's connect children with the massive learning resource of the internet.`,
    'Be expanded beyond your wildest dreams.',
    `Let's build a generation of problem solvers and innovators.`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeAnimation(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setCurrentCaptionIndex((prevIndex) => (prevIndex + 1) % captions.length);
        setFadeAnimation(false);
      }, 2000); // Fade out for 2 seconds
    }, 12000); // Change image every 12 seconds (10 seconds + 2 seconds fade-out)

    return () => clearInterval(interval);
  }, [images.length, captions.length]);

  const navigate = useNavigate();
  const cloudHandler = () => {
    navigate('/cloudkids')
  };

  return (
    <div style={{ marginTop: "19px" }}>
      <Container sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, ${fadeAnimation ? 0.8 : 0.2}), rgba(0, 0, 0, ${fadeAnimation ? 0.8 : 0.2})), url(${images[currentImageIndex]})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        filter: 'brightness(80%)',
        height: '800px',
        width: '100%',
        transition: 'background-image 2s ease-in-out',
      }} maxWidth={true}>
        <Grid container spacing={3} justify="center" color="white">
          <Grid item xs={12} style={{ marginTop: '90px' }} >
            <Typography variant="h3" align="center" gutterBottom  sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } // Responsive font size
            }}>We seek to empower kids from underserved rural areas of Kenya with digital and computer literacy.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" paragraph sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } // Responsive font size
            }}>
              {captions[currentCaptionIndex]}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={cloudHandler} style={{ marginBottom: '10px' }}>Learn More</Button>
            <br></br>
            <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ marginTop: '10px' }}>Donate</Button>
            <Donate open={openModal} handleClose={() => setOpenModal(false)} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Home