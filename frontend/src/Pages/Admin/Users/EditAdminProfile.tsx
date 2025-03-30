import { useEffect, useState } from "react";
import UserDataInterface from "../../../utils/interfaces/TypeInterface";
import { fetchProfileData } from "../../../utils/fetcher";
import PrivateNavBar from "../../../Components/private/PrivateNavBar";
import { Button, Card, Container, Form } from "react-bootstrap";

const EditAdminProfile = () => {
    const [user, setUser] = useState<UserDataInterface | null>(null);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    useEffect(() => {
        fetchProfileData().then(user => setUser(user));
    }, []);
    if (!user) return null;

    const handleEditBasicInfo = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
    }

    const handleEditUsername = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
    }

    const handleEditPassword = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
    }

    return (
        <>
            <PrivateNavBar role="admin" />
            <Container className="mt-3">
                <h1>Edit Admin Profile</h1>
                <Card>
                    <Card.Header>Edit Basic Info</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleEditBasicInfo}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={user.name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={user.email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button type="submit" variant="outline-warning">Change</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="mt-3">
                    <Card.Header>Change Username</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleEditUsername}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={user.username} onChange={(e) => setUsername(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button type="submit" variant="outline-warning">Change</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="mt-3">
                    <Card.Header>Change Password</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleEditPassword}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button type="submit" variant="outline-warning">Change</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default EditAdminProfile