import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateNavBar from "../../../Components/private/PrivateNavBar";
import { Container } from "react-bootstrap";

const UserProfile = () => {
    return (
        <>
            <PrivateNavBar role="admin" />
            <ToastContainer />
            <Container className="mt-3">
                <h1>User Profile</h1>
            </Container>
        </>
    )
}

export default UserProfile