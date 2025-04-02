import { useEffect, useState } from 'react';
import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { Card, Container, Form } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDataInterface from '../../../utils/interfaces/TypeInterface';
import { fetchModeratorById } from '../../../utils/fetcher';
import { useParams } from 'react-router-dom';
import AuthChecker from '../../../utils/AuthChecker';

const ModeratorProfile = () => {
    const { moderatorId } = useParams();
    const [moderator, setModerator] = useState<UserDataInterface | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await AuthChecker();

            if (!userRole || userRole !== "admin") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        };
        fetchRole();
    }, []);

    useEffect(() => {
        if (moderatorId) {
            fetchModeratorById(moderatorId).then(moderator => setModerator(moderator));
        } else {
            toast.error("Invalid moderator ID");
        }
    }, [moderatorId]);
    return (
        <>
            <PrivateNavBar role="admin" />
            <ToastContainer />
            <Container className="mt-3">
                <h1>Moderator Profile</h1>
                <Card>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={moderator?.name || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={moderator?.username || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={moderator?.email || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={moderator ? (moderator.role?.[0]?.toUpperCase() ?? '') + (moderator.role?.substring(1) ?? '') : ''} readOnly />
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ModeratorProfile