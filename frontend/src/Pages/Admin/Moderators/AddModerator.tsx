import { Container } from 'react-bootstrap';
import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddModerator = () => {
    return (
        <>
            <PrivateNavBar role="admin" />
            <ToastContainer />
            <Container className="mt-3">
                <h1>Add Moderator</h1>
            </Container>
        </>
    )
}

export default AddModerator