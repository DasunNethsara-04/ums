import { useEffect, useState } from "react";
import AuthChecker from "../../utils/AuthChecker";
import PrivateNavBar from "../../Components/private/PrivateNavBar";

const UserDashboard = () => {

    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await AuthChecker();

            if (!userRole || userRole !== "user") {
                window.location.href = "/login";
            }
        };

        fetchRole();
    }, []);

    return (
        <>
            <PrivateNavBar role="user" />
            User Dashboard
        </>
    );
};

export default UserDashboard;
