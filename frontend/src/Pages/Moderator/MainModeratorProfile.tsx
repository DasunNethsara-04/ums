import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import PrivateNavBar from "../../Components/private/PrivateNavBar"
import { Link } from "react-router-dom"
import UserDataInterface from "../../utils/interfaces/TypeInterface";
import { useEffect, useState } from "react";
import { fetchProfileData } from "../../utils/fetcher";

const MainModeratorProfile = () => {
    const [moderator, setModerator] = useState<UserDataInterface | null>(null);
    useEffect(() => {
        fetchProfileData().then(moderator => setModerator(moderator));
    }, []);
    if (!moderator) return null;
    return (
        <>
            <PrivateNavBar role="moderator" />
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h1>Moderator Profile</h1>
                    </Col>
                    <Col xs lg="2" className="text-end">
                        <Button as={Link} to="/moderator/profile/edit" variant="outline-warning">Edit Profile</Button>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={moderator.name} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={moderator.username} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={moderator.email} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={(moderator.role?.[0]?.toUpperCase() ?? '') + (moderator.role?.substring(1) ?? '')} readOnly />
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default MainModeratorProfile