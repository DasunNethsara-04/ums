import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const PublicNavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">UMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <a className='btn btn-sm btn-primary' as={Link} href='/login'>Login</a>
                    <a className='ms-2 btn btn-sm btn-outline-secondary' as={Link} href='/register'>Register</a>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default PublicNavBar