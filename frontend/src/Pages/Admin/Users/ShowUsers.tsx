import { useEffect, useState } from 'react'
import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import { fetchUserById, fetchUsers } from '../../../utils/fetcher';
import UserDataInterface from '../../../utils/interfaces/TypeInterface';

const ShowUsers = () => {
    const [showEditModel, setShowEditModel] = useState(false);
    const [users, setUsers] = useState([]);
    const [editUserData, setEditUserData] = useState<UserDataInterface | null>(null);


    useEffect(() => {
        fetchUsers().then((users) => setUsers(users));
    }, []);

    const handleEdit = async (id: number) => {
        console.log(id);
        fetchUserById(id).then(user => setEditUserData(user));
        handleShowEditModel();
    }

    const handleDelete = async (id: number) => {
        console.log(id);
    }

    const handleCloseEditModel = () => setShowEditModel(false);
    const handleShowEditModel = () => setShowEditModel(true);

    return (
        <>
            <PrivateNavBar role='admin' />
            <Container className='mt-3'>
                <h1>Show Users</h1>

                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user: UserDataInterface) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{(user.role)[0].toUpperCase() + (user.role).substring(1)}</td>
                                        <td>
                                            <Button variant="warning" size='sm' onClick={() => handleEdit(user.id)}>Edit</Button>
                                            <Button variant="danger" size='sm' className='ms-2' onClick={() => handleDelete(user.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>

                {/* Models for Edit Form and Confirm Deletion */}
                <Modal show={showEditModel} onHide={handleCloseEditModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' value={editUserData?.name} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' value={editUserData?.email} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' value={(editUserData?.username)} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Role</Form.Label>
                                <Form.Select name='role'>
                                    <option value='admin' defaultChecked={editUserData?.role === 'admin'}>Admin</option>
                                    <option value='user' defaultChecked={editUserData?.role === 'user'}>User</option>
                                    <option value='moderator' defaultChecked={editUserData?.role === 'moderator'}>Moderator</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select name='disabled'>
                                    <option value="1" defaultChecked={editUserData?.disabled === true}>Disabled</option>
                                    <option value="0" defaultChecked={editUserData?.disabled === false}>Active</option>
                                </Form.Select>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModel}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseEditModel}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default ShowUsers