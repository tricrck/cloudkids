import React, { useState, useEffect } from 'react'
import { Typography, Container, Grid, Box, Button, Divider, Fade, useTheme, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'

function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      content: "Isaac Salat Road, P.O.BOX 207 - 20200, Kericho, Kenya",
      action: () => window.open('https://maps.google.com/?q=Kericho,Kenya', '_blank')
    },
    {
      icon: "✉️",
      title: "Email",
      content: "info.nerdwaretechnologies@gmail.com",
      action: () => window.open('mailto:info.nerdwaretechnologies@gmail.com')
    },
    {
      icon: "📞",
      title: "Phone",
      content: "+254707263447",
      action: () => window.open('tel:+254707263447')
    }
  ]

  const socialLinks = [
    { icon: "📘", url: '#', label: 'Facebook', color: '#1877F2' },
    { icon: "🐦", url: '#', label: 'Twitter', color: '#1DA1F2' },
    { icon: "💼", url: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: "📷", url: '#', label: 'Instagram', color: '#E4405F' }
  ]

  const quickLinks = [
    { text: 'About Us', path: '/about' },
    { text: 'Contact', path: '/contact' }
  ]

  return (
    <Fade in={isVisible} timeout={1000}>
      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, #0a0b0d 0%, #1a1d23 50%, #2c3137 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 8s ease infinite'
          },
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' }
          }
        }}
      >
        {/* Animated Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
            `,
            animation: 'float 20s ease-in-out infinite'
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Main Footer Content */}
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Grid container spacing={4}>
              {/* Company Info */}
              <Grid item xs={12} md={4}>
                <Fade in={isVisible} timeout={1200} style={{ transitionDelay: '200ms' }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box 
                        sx={{ 
                          fontSize: '2.5rem', 
                          mr: 2,
                          background: 'linear-gradient(45deg, #4ECDC4, #45B7D1)',
                          borderRadius: '12px',
                          p: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        💻
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          background: 'linear-gradient(45deg, #4ECDC4, #45B7D1)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        Nerdware Systems
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3, 
                        lineHeight: 1.8,
                        color: 'rgba(255,255,255,0.8)'
                      }}
                    >
                      Empowering the next generation through digital literacy and innovation. 
                      Building bridges to connect underserved communities with technology.
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Made with
                      </Typography>
                      <Box sx={{ color: '#FF6B6B', fontSize: '1.2rem' }}>❤️</Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        for Kenya's future
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              </Grid>

              {/* Contact Information */}
              <Grid item xs={12} md={4}>
                <Fade in={isVisible} timeout={1200} style={{ transitionDelay: '400ms' }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 600,
                        color: '#FFEAA7'
                      }}
                    >
                      Get In Touch
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {contactInfo.map((item, index) => (
                        <Box
                          key={index}
                          onClick={item.action}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                              background: 'rgba(255,255,255,0.05)',
                              transform: 'translateX(8px)',
                              '& .contact-icon': {
                                transform: 'scale(1.2)'
                              }
                            }
                          }}
                        >
                          <Box 
                            className="contact-icon"
                            sx={{ 
                              fontSize: '1.5rem',
                              transition: 'all 0.3s ease',
                              mt: 0.5
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#FFEAA7', 
                                fontWeight: 500,
                                mb: 0.5
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255,255,255,0.8)',
                                lineHeight: 1.5
                              }}
                            >
                              {item.content}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Fade>
              </Grid>

              {/* Quick Links & Social */}
              <Grid item xs={12} md={4}>
                <Fade in={isVisible} timeout={1200} style={{ transitionDelay: '600ms' }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 600,
                        color: '#96CEB4'
                      }}
                    >
                      Quick Links
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
                      {quickLinks.map((link, index) => (
                        <Link
                          key={index}
                          to={link.path}
                          style={{ textDecoration: 'none' }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255,255,255,0.7)',
                              py: 1,
                              px: 2,
                              borderRadius: 1,
                              transition: 'all 0.3s ease',
                              display: 'inline-block',
                              '&:hover': {
                                color: '#96CEB4',
                                background: 'rgba(150, 206, 180, 0.1)',
                                transform: 'translateX(8px)'
                              }
                            }}
                          >
                            {link.text}
                          </Typography>
                        </Link>
                      ))}
                    </Box>

                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 600,
                        color: '#FF6B6B'
                      }}
                    >
                      Follow Us
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {socialLinks.map((social, index) => (
                        <Box
                          key={index}
                          onClick={() => window.open(social.url, '_blank')}
                          sx={{
                            color: 'rgba(255,255,255,0.7)',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            p: 1.5,
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                              background: social.color,
                              color: 'white',
                              transform: 'translateY(-4px) scale(1.1)',
                              boxShadow: `0 8px 25px ${social.color}40`
                            }
                          }}
                          aria-label={social.label}
                        >
                          {social.icon}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Fade>
              </Grid>
            </Grid>
          </Box>

          {/* Divider */}
          <Divider 
            sx={{ 
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              height: '1px',
              border: 'none'
            }} 
          />

          {/* Bottom Section */}
          <Fade in={isVisible} timeout={1200} style={{ transitionDelay: '800ms' }}>
            <Box 
              sx={{ 
                py: 3,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box sx={{ fontSize: '1rem' }}>🎓</Box>
                &copy; {new Date().getFullYear()} Nerdware Systems Technologies. All rights reserved.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Link to="/privacy" style={{ textDecoration: 'none' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      transition: 'color 0.3s ease',
                      '&:hover': { color: '#4ECDC4' }
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </Link>
                <Link to="/terms" style={{ textDecoration: 'none' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      transition: 'color 0.3s ease',
                      '&:hover': { color: '#4ECDC4' }
                    }}
                  >
                    Terms of Service
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Fade>
        </Container>

        {/* Scroll to Top Button */}
        <Fade in={showScrollTop}>
          <Button
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              background: 'linear-gradient(45deg, #4ECDC4, #45B7D1)',
              color: 'white',
              zIndex: 1000,
              minWidth: '56px',
              height: '56px',
              borderRadius: '50%',
              fontSize: '1.5rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'linear-gradient(45deg, #45B7D1, #4ECDC4)',
                transform: 'translateY(-4px) scale(1.1)',
                boxShadow: '0 12px 40px rgba(78, 205, 196, 0.4)'
              }
            }}
            aria-label="Scroll to top"
          >
            ⬆️
          </Button>
        </Fade>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
          }
        `}</style>
      </Box>
    </Fade>
  )
}

export default Footer