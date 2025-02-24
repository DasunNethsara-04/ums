import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavBarPropsInterface from '../../utils/interfaces/NavBarInterfaces';

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

const PrivateNavBar = ({ role }: NavBarPropsInterface) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {
          role == 'admin' ? (
            <Navbar.Brand as={Link} to="/admin/dashboard">UMS Admin</Navbar.Brand>) : (<Navbar.Brand as={Link} to="/user/dashboard">UMS User</Navbar.Brand>)
        }
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              role == 'admin' ? (
                <>
                  <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
                  <NavDropdown title="Users" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to='/admin/users/add'>Add User</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/users/show'>Show Users</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/admin/profile">Profile</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/user/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/user/profile">Profile</Nav.Link>
                </>
              )
            }
          </Nav>
          <a className='btn btn-sm btn-outline-danger' onClick={logout}>Logout</a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PrivateNavBar