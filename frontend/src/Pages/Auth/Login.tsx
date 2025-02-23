import { Button, Card, Form } from "react-bootstrap"
import PublicNavBar from "../../Components/Public/PublicNavBar";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        // Prevent the form from reloading the page
        event.preventDefault();

        // TODO: implement the form submission
        const formData: FormData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response: AxiosResponse = await axios.post(
                "http://localhost:8000/auth/login",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            if (response.status === 200) {
                setRole(response.data.role);
                localStorage.setItem("token", response.data.access_token);

                // check for the role of the user to navigate to the correct dashboard page
                if (role == "admin") {
                    navigate("/admin/dashboard");
                } else if (role == "user") {
                    navigate("/user/dashboard");
                }
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