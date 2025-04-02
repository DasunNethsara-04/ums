import { useEffect, useState } from 'react'
import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import { fetchUserById, fetchUsers } from '../../../utils/fetcher';
import UserDataInterface from '../../../utils/interfaces/TypeInterface';
import axios, { AxiosResponse } from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import AuthChecker from '../../../utils/AuthChecker';

const ModShowUsers = () => {
    const [showEditModel, setShowEditModel] = useState<boolean>(false);
    const [users, setUsers] = useState<UserDataInterface[]>([]);
    const [editUserData, setEditUserData] = useState<UserDataInterface | null>(null);

    // Updated user data
    const [editedName, setEditedName] = useState<string>('');
    const [editedEmail, setEditedEmail] = useState<string>('');
    const [editedUsername, setEditedUsername] = useState<string>('');
    const [editedRole, setEditedRole] = useState<string>('user');
    const [editedStatus, setEditedStatus] = useState<boolean>(false);

    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await AuthChecker();

            if (!userRole || userRole !== "moderator") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        };
        fetchRole();
    }, []);

    useEffect(() => {
        fetchUsers().then((users) => setUsers(users));
    }, []);

    const handleEdit = async (id: number) => {
        const user = await fetchUserById(id);
        setEditUserData(user);

        if (user) {
            setEditedName(user.name || '');
            setEditedEmail(user.email || '');
            setEditedUsername(user.username || '');
            setEditedRole(user.role || 'user');
            setEditedStatus(user.disabled || false);
        }

        setShowEditModel(true);
    };

    const handleUpdateUserData = async (e: React.FormEvent, id: number) => {
        e.preventDefault();

        const updatedUserData: UserDataInterface = {
            id,
            name: editedName,
            email: editedEmail,
            username: editedUsername,
            role: editedRole,
            disabled: editedStatus,
        }

        try {
            const response: AxiosResponse = await axios.put(`http://localhost:8000/admin/users/${id}`, updatedUserData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );
            if (response.status === 200) {
                toast(
                    "User data updated successfully",
                    {
                        type: "success",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    }
                )
                fetchUsers().then((users) => setUsers(users));
            } else {
                toast(
                    "Failed to update user data",
                    {
                        type: "error",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    }
                )
                return;
            }
        } catch (e) {
            console.log(e);
            toast(
                "Failed to update user data",
                {
                    type: "error",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                }
            )
            return;
        }
        setShowEditModel(false);
    };

    const handleDeleteConfirm = async (id: number) => {
        console.log(id);
        try {
            const response: AxiosResponse = await axios.delete(`http://localhost:8000/admin/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                },
            );
            if (response.status === 200) {
                toast(
                    "User deleted successfully",
                    {
                        type: "success",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    }
                )
                fetchUsers().then((users) => setUsers(users));
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <PrivateNavBar role="moderator" />
            <ToastContainer />
            <Container className="mt-3">
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
                            {users.map((user: UserDataInterface) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                                    <td>
                                        <Button as={Link} to={"/moderator/users/profile/" + user.id} size='sm'>Profile</Button>
                                        <Button variant="warning" size="sm" className='ms-2' onClick={() => handleEdit(user.id)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDeleteConfirm(user.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Edit User Modal */}
                <Modal show={showEditModel} onHide={() => setShowEditModel(false)}>
                    <Form onSubmit={(e) => editUserData && handleUpdateUserData(e, editUserData.id)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select value={editedRole} onChange={(e) => setEditedRole(e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="moderator">Moderator</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select value={editedStatus ? "1" : "0"} onChange={(e) => setEditedStatus(e.target.value === "1")}>
                                    <option value="1">Disabled</option>
                                    <option value="0">Active</option>
                                </Form.Select>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditModel(false)}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        </>
    )
}

export default ModShowUsers;