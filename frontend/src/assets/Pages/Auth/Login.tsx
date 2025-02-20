import { Button, Card, Form } from "react-bootstrap"
import PublicNavBar from "../../Components/Public/PublicNavBar";

const Login = () => {
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
                        <Card.Title className="text-center" as="h1">Login</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form method='post' onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' name='username' placeholder="WarMachineRox" required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="##########" required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <div className="d-grid gap-2">
                                    <Button type='submit' variant='outline-primary'>Login</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Login