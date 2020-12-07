import React from 'react'
import { connect } from 'react-redux'
import { Button, Navbar, NavbarBrand, NavLink, Nav } from 'react-bootstrap'

const Navigation = (props) => {
  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <NavbarBrand href='/'>BlogApp</NavbarBrand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='mr-auto'>
          <NavLink href='/blogs'>Blogs</NavLink>
          <NavLink href='/users'>Users</NavLink>
        </Nav>
        <Nav>
          <Navbar.Text className="mr-sm-2">
            Signed in as: {props.user.name}
          </Navbar.Text>
          <Button onClick={props.handleLogout} variant='light'>logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user
  }
}

const ConnectedNavigation = connect(mapStateToProps)(Navigation)
export default ConnectedNavigation
