import { useEffect } from "react";
import AuthChecker from "../../utils/AuthChecker";
import PrivateNavBar from "../../Components/private/PrivateNavBar";
import { Container } from "react-bootstrap";

const UserDashboard = () => {

    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await AuthChecker();

            if (!userRole || userRole !== "user") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        };
        fetchRole();
    }, []);

    return (
        <>
            <PrivateNavBar role="user" />
            <Container className="mt-3">
                <h1>User Dashboard</h1>
            </Container>
        </>
    );
};

export default UserDashboard;
