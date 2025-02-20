import { Button, Card, Form } from "react-bootstrap"
import PublicNavBar from "../../Components/Public/PublicNavBar";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: any) => {
        // Prevent the form from reloading the page
        event.preventDefault();

        // TODO: implement the form submission
        const formData: FormData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response: AxiosResponse = await axios.post(
                "http://localhost:8000/api/auth/login",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200) {
                alert("User registered successfully");
                window.location.href = "/login";
            } else {
                alert("User registration failed");
                console.log(response)
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <PublicNavBar />
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Card style={{ width: "50rem" }}>
                    <Card.Header>
                        <Card.Title className="text-center" as="h1">Login</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form method='post' onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' name='username' placeholder="WarMachineRox" onChange={(e) => setUsername(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="##########" onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <div className="d-grid gap-2">
                                    <Button type='submit' variant='outline-primary'>Login</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Login