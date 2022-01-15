import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Book Finder</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              <LinkContainer to='/'>
                <Nav.Link><i className='fas fa-home'></i>Home</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-book'></i>Wish List</Nav.Link>
              </LinkContainer>
              
              <NavDropdown title="Search" id="basic-nav-dropdown">
                
                <LinkContainer to='/'>
                  <NavDropdown.Item>Book Search</NavDropdown.Item>
                </LinkContainer>
                
                <LinkContainer to='/'>
                  <NavDropdown.Item>Frequrntly Downloaded</NavDropdown.Item>
                </LinkContainer>
                
                <LinkContainer to='/'>
                  <NavDropdown.Item>Book Shelves</NavDropdown.Item>
                </LinkContainer>
                
                <NavDropdown.Divider />
                <LinkContainer to='/'>
                  <NavDropdown.Item>Offline catelog</NavDropdown.Item>
                </LinkContainer>
                
              </NavDropdown>
              <LinkContainer to='/login"'>
                <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
              </LinkContainer>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
