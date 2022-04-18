import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><img src={process.env.PUBLIC_URL + "/images/kitaab-logo.png"} alt='logo' /></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
            <LinkContainer to='/'>
                <Nav.Link><i className='fas fa-home'></i>Home</Nav.Link>
              </LinkContainer>
              
              {/* <LinkContainer to='/genre'>
                <Nav.Link><i className='fas fa-book'></i>Genre</Nav.Link>
              </LinkContainer> */}
              <LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-heart'></i>Wish List</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/about'>
                <Nav.Link><i className="fa-solid fa-address-card"></i>About</Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item id='dropdown'>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler} id='dropdown'>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenue'>
                    <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item id='dropdown'>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/booklist'>
                        <NavDropdown.Item id='dropdown'>Books</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
            )}

                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
