import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Book Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/"><i className='fas fa-home'></i>Home</Nav.Link>
              <Nav.Link href="/freeEbook"><i className='fas fa-book'></i>Free Ebook</Nav.Link>
              <NavDropdown title="Search" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Book Search</NavDropdown.Item>
                <NavDropdown.Item href="/">Frequrntly Downloaded</NavDropdown.Item>
                <NavDropdown.Item href="/">Book Shelves</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Offline catelog</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/login"><i className='fas fa-user'></i> Sign In</Nav.Link>
              <Button variant="success" size='lg' >Donate</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
