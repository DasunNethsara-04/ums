import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateNavBar from "../../Components/private/PrivateNavBar";
import { Card, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import UserDataInterface from "../../utils/interfaces/TypeInterface";
import { fetchProfileData } from "../../utils/fetcher";

const AdminProfile = () => {
    const [user, setUser] = useState<UserDataInterface | null>(null);
    useEffect(() => {
        fetchProfileData().then(user => setUser(user));
    }, []);
    if (!user) return null;
    return (
        <>
            <PrivateNavBar role="admin" />
            <ToastContainer />
            <Container className="mt-3">
                <h1>Admin Profile</h1>
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