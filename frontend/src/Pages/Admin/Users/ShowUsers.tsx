import { useEffect, useState } from 'react'
import PrivateNavBar from '../../../Components/private/PrivateNavBar'
import { Container, Table } from 'react-bootstrap'
import { fetchUsers } from '../../../utils/fetcher';

const ShowUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers().then((users) => setUsers(users));
    }, []);
    console.log(users)
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
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Fetch users data from API */}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    )
}

export default ShowUsers