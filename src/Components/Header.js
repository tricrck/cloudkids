import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../Images/image-Photoroom (1).png';

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='fixed-top'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <img src={logo} alt="Logo" className='logo' />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to='/cloudkids'>
              <Nav.Link>Cloudkids</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/about'>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/contact'>
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
