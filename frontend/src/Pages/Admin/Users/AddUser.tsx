import React, { useState } from 'react';
import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosResponse } from 'axios';

const AddUser = () => {
    const [name, setName] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = {
            name: name,
            username: username,
            email: email,
            password: username
        }

        try {
            const response: AxiosResponse = await axios.post("http://localhost:8000/admin/users", userData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.status === 200) {
                toast(
                    "User created successfully",
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
            }
        } catch (e) {
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
        }
    }

    return (
        <>
            <PrivateNavBar role='admin' />
            <ToastContainer />
            <Container className='mt-3'>
                <h1>New User</h1>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name='name' placeholder="David Johns" onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name='username' placeholder="david123" onChange={(e) => setUserName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name='email' placeholder="david@example.com" onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Button type='submit' variant='primary'>Save</Button>
                                <Button type='reset' variant='outline-secondary' className='ms-2'>Reset</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default AddUser