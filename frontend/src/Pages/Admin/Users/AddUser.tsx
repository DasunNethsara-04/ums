import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
    return (
        <>
            <PrivateNavBar role='admin' />
            <ToastContainer />
            <Container className='mt-3'>
                <h1>New User</h1>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name='name' placeholder="David Johns" />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name='username' placeholder="david123" />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name='email' placeholder="david@example.com" />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Role</Form.Label>
                                <Form.Select name='role'>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Button type='submit' variant='primary'>Save</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default AddUser