import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { Container } from 'react-bootstrap'

const AddUser = () => {
    return (
        <>
            <PrivateNavBar role='admin' />
            <Container className='mt-3'>
                <h1>New User</h1>
            </Container>
        </>
    )
}

export default AddUser