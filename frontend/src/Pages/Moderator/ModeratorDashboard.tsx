import { useEffect } from "react";
import PrivateNavBar from "../../Components/private/PrivateNavBar";
import AuthChecker from "../../utils/AuthChecker";
import { Container } from "react-bootstrap";

const ModeratorDashboard = () => {
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

    return (
        <>
            <PrivateNavBar role="moderator" />
            <Container className="mt-3">
                <h1>Moderator Dashboard</h1>
            </Container>
        </>
    );
}

export default ModeratorDashboard