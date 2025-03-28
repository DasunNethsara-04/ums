import { useEffect } from "react";
import PrivateNavBar from "../../Components/private/PrivateNavBar";
import AuthChecker from "../../utils/AuthChecker";

const ModeratorDashboard = () => {
    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await AuthChecker();

            if (!userRole || userRole !== "moderator") {
                window.location.href = "/login";
            }
        };

        fetchRole();
    }, []);

    return (
        <>
            <PrivateNavBar role="admin" />
            Moderator Dashboard
        </>
    );
}

export default ModeratorDashboard