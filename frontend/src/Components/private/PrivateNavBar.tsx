import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

const PrivateNavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">UMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <a className='btn btn-sm btn-outline-danger' onClick={logout}>Logout</a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PrivateNavBar