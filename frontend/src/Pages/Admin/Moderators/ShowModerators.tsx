import { Container } from 'react-bootstrap';
import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowModerators = () => {
    return (
        <>
            <PrivateNavBar role="admin" />
            <ToastContainer />
            <Container className="mt-3">
                <h1>All Moderators</h1>
            </Container>
        </>
    )
}

export default ShowModerators