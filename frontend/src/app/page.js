'use client'
import { Button, Navbar, NavbarText, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Home() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container > 
        <Navbar.Brand href="/">E-Commerce Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> 
            <Nav.Link href="/products">Products</Nav.Link>
          </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
 )
}
