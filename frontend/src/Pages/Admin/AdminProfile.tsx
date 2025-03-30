import "react-toastify/dist/ReactToastify.css";
import PrivateNavBar from "../../Components/private/PrivateNavBar";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import UserDataInterface from "../../utils/interfaces/TypeInterface";
import { fetchProfileData } from "../../utils/fetcher";
import { Link } from "react-router-dom";

const AdminProfile = () => {
    const [user, setUser] = useState<UserDataInterface | null>(null);
    useEffect(() => {
        fetchProfileData().then(user => setUser(user));
    }, []);
    if (!user) return null;
    return (
        <>
            <PrivateNavBar role="admin" />
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h1>Admin Profile</h1>
                    </Col>
                    <Col xs lg="2" className="text-end">
                        <Button as={Link} to="/admin/profile/edit" variant="outline-warning">Edit Profile</Button>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={user.name} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={user.username} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={user.email} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={(user.role?.[0]?.toUpperCase() ?? '') + (user.role?.substring(1) ?? '')} readOnly />
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default AdminProfile;