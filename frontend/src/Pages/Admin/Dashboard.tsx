import { useEffect, useState } from "react";
import AuthChecker from "../../utils/AuthChecker";
import PrivateNavBar from "../../Components/private/PrivateNavBar";

const AdminDashboard = () => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await AuthChecker();

            if (!userRole || userRole !== "admin") {
                window.location.href = "/login";
            } else {
                setRole(userRole);
            }
        };

        fetchRole();
    }, []);

    return (
        <>
            <PrivateNavBar />
            Admin Dashboard
        </>
    );
};

export default AdminDashboard;
