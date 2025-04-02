import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateNavBar from "../../../Components/private/PrivateNavBar";
import { Card, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserDataInterface from "../../../utils/interfaces/TypeInterface";
import { fetchUserById } from "../../../utils/fetcher";
import AuthChecker from "../../../utils/AuthChecker";

const ModUserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<UserDataInterface | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await AuthChecker();

            if (!userRole || userRole !== "moderator") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        };
        fetchRole();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUserById(userId).then(user => setUser(user));
        } else {
            toast.error("Invalid user id");
        }
    }, [userId]);
    return (
        <>
            <PrivateNavBar role="moderator" />
            <ToastContainer />
            <Container className="mt-3">
                <h1>User Profile</h1>
                <Card>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={user?.name || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={user?.username || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={user?.email || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={user ? (user.role?.[0]?.toUpperCase() ?? '') + (user.role?.substring(1) ?? '') : ''} readOnly />
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ModUserProfile;