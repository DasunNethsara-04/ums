import { useEffect, useState } from "react";
import AuthChecker from "../../utils/AuthChecker";
import PrivateNavBar from "../../Components/private/PrivateNavBar";
import { Card, Col, Container, Row } from "react-bootstrap";
import { fetchModeratorCount, fetchUserCount } from "../../utils/fetcher";

const AdminDashboard = () => {
    const [userCount, setUserCount] = useState<number>(0);
    const [moderatorCount, setModeratorCount] = useState<number>(0);
    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await AuthChecker();

            if (!userRole || userRole !== "admin") {
                window.location.href = "/login";
            }
        };
        fetchRole();
    }, []);

    useEffect(() => {
        fetchUserCount().then(count => setUserCount(count))
        // fetchModerators();
    });

    useEffect(() => {
        fetchModeratorCount().then(count => setModeratorCount(count))
    });

    return (
        <>
            <PrivateNavBar role="admin" />
            <Container className="mt-3">
                <h1>Dashboard</h1>
                <Row className="mt-3">
                    <Col md="6">
                        <Card>
                            <Card.Body>
                                <Card.Title>{userCount}</Card.Title>
                                <Card.Text>
                                    Users
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <Card.Body>
                                <Card.Title>{moderatorCount}</Card.Title>
                                <Card.Text>
                                    Moderators
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminDashboard;
