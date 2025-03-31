import { useEffect, useState } from "react";
import { fetchProfileData } from "../../utils/fetcher";
import PrivateNavBar from "../../Components/private/PrivateNavBar";
import { Button, Card, Container, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosResponse } from "axios";

const EditModeratorProfile = () => {
    const [id, setId] = useState<number | undefined>(undefined);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    useEffect(() => {
        fetchProfileData().then(user => {
            if (user) {
                setId(user.id);
                setName(user.name || "");
                setEmail(user.email || "");
                setUsername(user.username || "");
            }
        });
    }, []);

    const handleEditBasicInfo = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
        }
        try {
            const response: AxiosResponse<any, any> = await axios.patch("http://localhost:8000/auth/profile/edit/" + id + "/basic", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Failed to update profile!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the profile!");
        }
    }

    const handleEditUsername = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const data = {
            username: username,
        };
        try {
            const response: AxiosResponse<any, any> = await axios.patch("http://localhost:8000/auth/profile/edit/" + id + "/username", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                toast.success("Username updated successfully!");
                // wait for a second to logout
                setTimeout(() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }, 1000);

            } else {
                toast.error("Failed to update username!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the username!");
        }
    }

    const handleEditPassword = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        const data = {
            password: password,
            confirm_password: confirmPassword,
        };
        try {
            const response: AxiosResponse<any, any> = await axios.patch("http://localhost:8000/auth/profile/edit/" + id + "/password", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                toast.success("Password updated successfully!");
            } else {
                toast.error("Failed to update password!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the password!");
        }
    }
    return (
        <>
            <PrivateNavBar role="user" />
            <ToastContainer />
            <Container className="mt-3">
                <h1>Edit Moderator Profile</h1>
                <Card>
                    <Card.Header>Edit Basic Info</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleEditBasicInfo}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
                            <Form.Group className="mb-3">
                                <Form.Label>Username*</Form.Label>
                                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <Form.Text className="text-muted">
                                    * When you update the username, you will be logged out and need to log in again with the new username.
                                </Form.Text>
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
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
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

export default EditModeratorProfile