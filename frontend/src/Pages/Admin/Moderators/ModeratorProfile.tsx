import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { Container } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModeratorProfile = () => {
    return (
        <>
            <PrivateNavBar role="admin" />
            <ToastContainer />
            <Container className="mt-3">
                <h1>Moderator Profile</h1>
            </Container>
        </>
    )
}

export default ModeratorProfile