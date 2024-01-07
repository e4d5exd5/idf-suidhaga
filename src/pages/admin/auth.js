import AdminLayout from "@/layouts/admin.layout";
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const Auth = () => {
    const { data: session, status } = useSession()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/admin/users/');
                const data = await response.json();
                console.log(response);
                if (response.ok) {
                    setUsers(data.users);
                    console.log(data.users);
                } else {
                    console.error('Error fetching users:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    return(<>
        <AdminLayout>
            User Authentication
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr className='bg-[#f2f2f2]'>
                                <th className='border border-solid border-black p-1 text-left'>Name</th>
                                <th className='border border-solid border-black p-1 text-left'>Mobile Number</th>

                                {/* <th>Mobile</th> */}
                                <th className='border border-solid border-black p-1 text-left'>Aadhar No.</th>
                                {/* <th>Verification</th> */}
                                <th className='border border-solid border-black p-1 text-left'>Role</th>
                                <th className='border border-solid border-black p-1 text-left'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className=' border border-solid border-black'>
                                    <td className='border border-solid border-black p-1 text-left'>{user.title}{' '}{user.firstName}{' '}{user.middleName}{' '}{user.lastName}</td>
                                    <td className='border border-solid border-black p-1 text-left'>{user.UserAuth.mobile}</td>

                                    <td className='border border-solid border-black p-1 text-left'>{user.aadharNumber}</td>
                                    <td className='border border-solid border-black p-1 text-left'>{user.UserAuth.UserRole.name}</td>
                                    <td className='border border-solid border-black p-1 text-left'>{user.UserAuth.UserRole.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
        </AdminLayout>
    </>)
}

export default Auth;