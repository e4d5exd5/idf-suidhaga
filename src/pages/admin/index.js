import { useSession } from 'next-auth/react'
import {
    LoginButton,
    RegisterButton,
    LogoutButton
} from '@/components/buttons.component'
import AdminNav from '@/components/Navbars/AdminNav.component'
import { useState , useEffect } from 'react'



export default function Home() {
    const { data: session, status } = useSession()
    console.log(status, session)

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


    return (
        <>
            <AdminNav></AdminNav>
            {/* Home
      <br />
      <button onClick={() => registerHandler()} >Register as John Doe</button>
      <br />
      <LoginButton />
      <br />
      Create /register page to use this
      <RegisterButton /> 
      <br />
      <LogoutButton /> */}
      <div className='p-3'>
      <h1>User List</h1>
      <ul>
        <table  style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
                <tr className='bg-[#f2f2f2]'>
                    <th className='border border-solid border-black p-1 text-left'>Title</th>
                    <th className='border border-solid border-black p-1 text-left'>First Name</th>
                    <th className='border border-solid border-black p-1 text-left'>Middle Name</th>
                    <th className='border border-solid border-black p-1 text-left'>Last Name</th>
                    {/* <th>Mobile</th> */}
                    <th className='border border-solid border-black p-1 text-left'>Aadhar No.</th>
                    <th className='border border-solid border-black p-1 text-left'>Roll No.</th>
                    <th className='border border-solid border-black p-1 text-left'>Batch Month</th>
                    <th className='border border-solid border-black p-1 text-left'> Batch No.</th>
                    {/* <th>Verification</th> */}
                    <th className='border border-solid border-black p-1 text-left'>Created At</th>
                    <th className='border border-solid border-black p-1 text-left'>Updated At</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id} className=' border border-solid border-black'>
                <td className='border border-solid border-black p-1 text-left'>{user.title}</td>
                <td className='border border-solid border-black p-1 text-left'>{user.firstName}</td>
                <td className='border border-solid border-black p-1 text-left'>{user.middleName}</td>
                <td className='border border-solid border-black p-1 text-left'>{user.lastName}</td>
                <td className='border border-solid border-black p-1 text-left'>{user.aadharNumber}</td>
                <td className='border border-solid border-black p-1 text-left'>{user.rollNumber}</td>
                <td className='border border-solid border-black p-1 text-left'>{user.batchMonth}</td>
                <td className='border border-solid border-black p-1 text-left'>{user.batchNo}</td>
                <td className='border border-solid border-black p-1 text-left'>{user.createdAt}</td>
                <td className='border border-solid border-black p-1 text-left'>{user.updatedAt}</td>
                </tr>
            ))}
            </tbody>
        </table>
        {users.map((user) => (
            <>
                {/* <li key={user.id}>{user.aadharNumber}</li> */}
                
            </>
         
        ))}
      </ul>
      </div>
        </>
    )
}
