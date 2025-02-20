import { Button, Card, Col, Form, Row } from "react-bootstrap"
import PublicNavBar from "../../Components/Public/PublicNavBar";

const Register = () => {

    const handleSubmit = async (event: any) => {
        // Prevent the form from reloading the page
        event.preventDefault();

        // TODO: implement the form submission
    }

    return (
        <>
            <PublicNavBar />
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Card style={{ width: "50rem" }}>
                    <Card.Header>
                        <Card.Title className="text-center" as="h1">Register</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form method='post' onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' name='name' required />
                            </Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type='text' name='username' required />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' name='email' required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" required />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Re-enter Password</Form.Label>
                                        <Form.Control type="password" name="confirmPassword" required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className='mb-3'>
                                <div className="d-grid gap-2">
                                    <Button type='submit' variant='outline-primary'>Register</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Register