import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Container, Grid, Button, Box, Fade, Skeleton } from '@mui/material'
import Donate from '../Components/Donate'

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const intervalRef = useRef(null)
  const containerRef = useRef(null)

  const images = useMemo(() => [
    require('../Images/image1.png'),
    require('../Images/image2.jpeg'),
    require('../Images/image3.jpeg'),
    require('../Images/image4.jpeg')
  ], [])

  const captions = [
    `Knowledge is not just preserved for the elite.`,
    `Let's connect children with the massive learning resource of the internet.`,
    'Be expanded beyond your wildest dreams.',
    `Let's build a generation of problem solvers and innovators.`
  ]

  // Preload all images for seamless transitions
  const preloadImages = useCallback(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      })
    })

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true)
      })
      .catch(error => {
        console.error('Error preloading images:', error)
        setImagesLoaded(true) // Still show content even if some images fail
      })
  }, [images])

  useEffect(() => {
    preloadImages()
  }, [preloadImages])

  // Enhanced transition logic with smooth fade effects
  const transitionToNext = useCallback(() => {
    if (!imagesLoaded) return

    setIsTransitioning(true)
    setIsVisible(false)

    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      setCurrentCaptionIndex((prevIndex) => (prevIndex + 1) % captions.length)
      
      setTimeout(() => {
        setIsVisible(true)
        setIsTransitioning(false)
      }, 100)
    }, 500)
  }, [images.length, captions.length, imagesLoaded])

  useEffect(() => {
    if (!imagesLoaded) return

    intervalRef.current = setInterval(transitionToNext, 8000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [transitionToNext, imagesLoaded])

  // Intersection Observer for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (intervalRef.current) return
          intervalRef.current = setInterval(transitionToNext, 8000)
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [transitionToNext])

  const navigate = useNavigate()
  
  const cloudHandler = () => {
    navigate('/cloudkids')
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  // Enhanced background styles with smooth transitions
  const backgroundStyles = {
    position: 'relative',
    backgroundImage: imagesLoaded 
      ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${images[currentImageIndex]})`
      : 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '800px',
    width: '100%',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isTransitioning ? 'scale(1.02)' : 'scale(1)',
    filter: `brightness(${isTransitioning ? '70%' : '85%'}) contrast(1.1) saturate(1.1)`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
      transition: 'opacity 0.8s ease-in-out',
      opacity: isTransitioning ? 0.8 : 0.4
    }
  }

  const contentStyles = {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  }

  if (!imagesLoaded) {
    return (
      <div style={{ marginTop: "19px" }}>
        <Container maxWidth={false} sx={{ height: '800px', position: 'relative' }}>
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height="100%" 
            animation="wave"
            sx={{ 
              bgcolor: 'rgba(0,0,0,0.1)',
              '&::after': {
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
              }
            }}
          />
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Loading amazing content...
            </Typography>
          </Box>
        </Container>
      </div>
    )
  }

  return (
    <div style={{ marginTop: "19px" }}>
      <Container 
        ref={containerRef}
        sx={backgroundStyles} 
        maxWidth={false}
      >
        <Box sx={contentStyles}>
          <Fade in={isVisible} timeout={800}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h3" 
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3.2rem' },
                    fontWeight: 700,
                    color: 'white',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    maxWidth: '90%',
                    mx: 'auto',
                    transition: 'all 0.6s ease-in-out',
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    mb: 4
                  }}
                >
                  We seek to empower kids from underserved rural areas of Kenya with digital and computer literacy.
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography 
                  variant="h4" 
                  paragraph
                  sx={{
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.8rem', lg: '2rem' },
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.95)',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                    textAlign: 'center',
                    lineHeight: 1.4,
                    maxWidth: '80%',
                    mx: 'auto',
                    transition: 'all 0.6s ease-in-out',
                    transitionDelay: '0.2s',
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    fontStyle: 'italic',
                    mb: 5
                  }}
                >
                  {captions[currentCaptionIndex]}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={cloudHandler}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      borderRadius: '50px',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      boxShadow: '0 8px 32px rgba(33, 150, 243, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: '0.4s',
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: '0 12px 40px rgba(33, 150, 243, 0.4)',
                        background: 'linear-gradient(45deg, #1976D2 30%, #0288D1 90%)'
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(0.98)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                  
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleOpenModal}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      borderRadius: '50px',
                      background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
                      boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: '0.6s',
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: '0 12px 40px rgba(255, 107, 107, 0.4)',
                        background: 'linear-gradient(45deg, #FF5252 30%, #FF7979 90%)'
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(0.98)'
                      }
                    }}
                  >
                    Donate
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Fade>
        </Box>
        
        {/* Progress indicators */}
        <Box sx={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 3
        }}>
          {images.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: currentImageIndex === index 
                  ? 'rgba(255,255,255,0.9)' 
                  : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  transform: 'scale(1.2)'
                }
              }}
              onClick={() => {
                if (index !== currentImageIndex) {
                  setIsVisible(false)
                  setTimeout(() => {
                    setCurrentImageIndex(index)
                    setCurrentCaptionIndex(index)
                    setIsVisible(true)
                  }, 300)
                }
              }}
            />
          ))}
        </Box>
      </Container>
      
      <Donate open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  )
}

export default Home