import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PublicNavBar from "../../Components/Public/PublicNavBar";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

const Register = () => {

    const validatePassword = (password: string, confirmPassword: string): boolean => {
        return password === confirmPassword;
    };

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event: any) => {
        // Prevent the form from reloading the page
        event.preventDefault();

        if (!validatePassword(password, confirmPassword)) {
            alert("Passwords do not match");
            return;
        }

        const formData: FormData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response: AxiosResponse = await axios.post(
                "http://localhost:8000/auth/",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 201) {
                alert("User registered successfully");
                window.location.href = "/login";
            } else {
                alert("User registration failed");
                console.log(response)
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <PublicNavBar />
            <div className="position-absolute top-50 start-50 translate-middle">
                <Card style={{ width: "50rem" }}>
                    <Card.Header>
                        <Card.Title className="text-center" as="h1">
                            Register
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form method="post" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="James Rods"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="WarMachineRox"
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="warmachine@stak.net"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="##########"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Re-enter Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="##########"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <div className="d-grid gap-2">
                                    <Button type="submit" variant="outline-primary">
                                        Register
                                    </Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default Register;
